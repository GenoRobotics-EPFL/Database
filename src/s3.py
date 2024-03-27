import os
from boto3 import Session
from botocore.exceptions import ClientError
from botocore.config import Config

from pydantic_schemas import S3UploadFileStart, S3UploadFileEnd

# template
# https://github.com/T-Tmnr/aws_s3_multipartupload_with_presigned_url/blob/927685c378c4e929ce606dbec735304a3e49a0bd/aws-multipart-upload.py

if os.environ.get("AWS_DISABLED") is not None:
    MAGICAL_BUCKET_EXISTS = True
else:
    MAGICAL_BUCKET_EXISTS = False

    BUCKET_NAME = os.environ["AWS_BUCKET_NAME"]
    REGION_NAME = os.environ["AWS_REGION_NAME"]

    config = Config(
        region_name=REGION_NAME,
        signature_version="v4",
    )

    session = Session()
    s3 = session.client("s3", config=config)


def assert_bucket_exist() -> None:
    """
    Check if the bucket exists and if not, create it
    """
    if MAGICAL_BUCKET_EXISTS:
        return

    if not _bucket_exists():
        print(f"WARNING: creating new bucket '{BUCKET_NAME}'...", end=" ")
        _create_bucket()
        print("Done.")
        print("Changes may take some time to take effect.")


def _bucket_exists() -> bool:
    """
    Return if the bucket has already been created or not
    """
    try:
        s3.head_bucket(Bucket=BUCKET_NAME)
    except ClientError:
        return False
    return True


def _create_bucket() -> None:
    """
    Create the bucket (i.e. create the resource on the AWS infrastructure)

    Set the bucket configuration
    """
    s3.create_bucket(
        Bucket=BUCKET_NAME,
        CreateBucketConfiguration={
            "LocationConstraint": REGION_NAME,
        },
    )

    # make the bucket private
    s3.put_public_access_block(
        Bucket=BUCKET_NAME,
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": True,
            "IgnorePublicAcls": True,
            "BlockPublicPolicy": True,
            "RestrictPublicBuckets": True,
        },
    )

    # must set expose headers to extract header for complete_upload_large_file
    # https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api/44816592#44816592
    s3.put_bucket_cors(
        Bucket=BUCKET_NAME,
        CORSConfiguration={
            "CORSRules": [
                {
                    "AllowedHeaders": ["*"],
                    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
                    "AllowedOrigins": ["*"],  # might be refined later
                    "ExposeHeaders": ["ETag"],
                }
            ],
        },
    )


def file_exists(filename: str) -> bool:
    """
    Return if the file already exists
    """
    try:
        s3.head_object(Bucket=BUCKET_NAME, Key=filename)
    except ClientError:
        return False
    return True


def get_download_file_url(filename: str, expiration: int = 3600) -> str:
    """
    Return an URL that can be used to download the file `filename`
    (GET request)
    """
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": BUCKET_NAME, "Key": filename},
        ExpiresIn=expiration,
    )


def get_upload_file_url(filename: str, expiration: int = 3600) -> str:
    """
    Return an URL that can be used to upload a file as `filename`
    (PUT request)

    Note: Only use for small file (<5MB)
    """
    return s3.generate_presigned_url(
        "put_object",
        Params={"Bucket": BUCKET_NAME, "Key": filename},
        ExpiresIn=expiration,
    )


def get_upload_large_file_data(
    filename: str, n_parts: int, expiration: int = 3600
) -> S3UploadFileStart:
    """
    Initiate a multipart upload. Generate one URL for each part.
    Use with `complete_upload_large_file`.

    Return the upload id and the generated URLs
    """
    res = s3.create_multipart_upload(Bucket=BUCKET_NAME, Key=filename)
    upload_id = res["UploadId"]

    urls = []

    for i in range(n_parts):
        url = s3.generate_presigned_url(
            ClientMethod="upload_part",
            Params={
                "Bucket": BUCKET_NAME,
                "Key": filename,
                "UploadId": upload_id,
                "PartNumber": i + 1,
            },
            ExpiresIn=expiration,
        )
        urls.append(url)

    return S3UploadFileStart(upload_id=upload_id, urls=urls)


def complete_upload_large_file(filename: str, data: S3UploadFileEnd) -> None:
    """
    Terminate a multipart upload given the upload id and the etag of each part.

    This must be called for the upload to actually take effect.
    """
    s3.complete_multipart_upload(
        Bucket=BUCKET_NAME,
        Key=filename,
        MultipartUpload={
            "Parts": [
                {"ETag": part.etag, "PartNumber": part.part} for part in data.parts
            ]
        },
        UploadId=data.upload_id,
    )


def delete_file(filename: str) -> None:
    """
    Delete the file `filename`
    """
    s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=filename,
    )

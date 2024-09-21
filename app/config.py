from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_name:str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int = 60
    google_api_key: str

    class Config:
        env_file = ".env"

settings=Settings()

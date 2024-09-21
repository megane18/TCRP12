from passlib.context import CryptContext
import google.generativeai as genai
from .config import settings


pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash(password: str):
    return pwd_context.hash(password)

def verifyPassword(plainPassword: str,hashedPassword: str):
    return pwd_context.verify(plainPassword,hashedPassword)

async def get_gemini_repsonse(input):
    model=genai.GenerativeModel('gemini-1.5-flash')
    context="""The following is a conversation with an AI assistant designed to answer questions on financial literacy and
    housing. You were built for CRP(Community Restoration Project). Here is some information about the programs provided
    by CRP - 
    H.A.N.D.S.
    The H.A.N.D.S. initiative was established to help families that have lived in extended stay motels for at least 6 months get into an apartment. Because of the high weekly rate extended stay motels charge for residency, families often times cannot save enough money for a security deposit and the first and last months rent. For those just needing rental assistance CRP can pay the security deposit and first month’s rent for a family to help them get into an apartment.
    
    Permanent Housing
    Individuals enrolled in the Permanent Housing program have their immediate housing needs met, which includes a room in a shared living space along with bedroom and living room furniture. Over the course of the program, individuals share living spaces with a roommate of the same sex. We provide housing through a CRP sublease; rent is divided equally and households received a monthly credit for electricity.

    Kids Home Intiative
    Kids Home Initiative is a resource for homeless and housing-instable families. CRP provides a well-rounded, individualized solution to house each family. Solutions include up to $2,500 for remedying housing barriers as well as food assistance. Children experiencing housing instability often struggle in classes and other aspects of life. With KHI, we aim to help these children more easily achieve academic success and stability. To qualify, families must be referred by a school counselor.

    Financial Achievement Club
    Once placed in permanent housing, families and individuals are given the opportunity to join the Financial Achievement Club (FAC). Through the FAC, CRP incentivizes families by offering a monetary match for meeting goals set for building savings, increasing credit scores and income, and attending financial workshops. """
    input=context+input
    response=model.generate_content(input,generation_config=genai.GenerationConfig(max_output_tokens=1000,),)
    return response.text



genai.configure(api_key=settings.google_api_key)
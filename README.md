# blockchain-developer-bootcamp-final-project
# Certification Dapp 

There is fake news. And, there are fake certifications. If you ever hire a freshgrad, you know the whole hiring process can be slow and painful. Or in another situation you want to hire a foreign worker. How do you verify the new hire certification is genuine? 
You would need to contact the school one by one and maybe the their language is not the language that you want. so you need certifications were written securely, where they could not be deleted or changed. 

How it work? Upload your certification in our website and sign It with your key.

In the following, I will explain the main actions that each of them can do in the application:

*	As a `person`, I can create **name**, **ID**, and add additional documents in **IPFS** and sign it with my key.
*	As a `school`, I have a **name** and **website**.
*	As a `school`, I need to find my student and verify that student.
*	As a `school`, I can write the **scores** in a universal framework that every school should use that. And I can Implement the IPFS signature in it.
*	As a `school`, I can create a **totalScore+subjectName**.
*	As a `company`, I can read the school documents about its student.


## app defition

### Users
#### variables
    1. school
    2. person

#### methods
    1. create
    2. get
    3. update
    4. remove

### certification

    1. school should add person to the school list
    2. school should add person.grade;

#### variables
    1. course name
    2. 

#### modifire 
    1. onlySchool
    2. onlyPerson

#### methods
    1. create -> onlySchool
    2. get -> onlyPerson
        1.  

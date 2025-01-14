API

/auth/register

POST

body params :

- user_name: mandatory, string
- email: mandatory, string, is checking if is an email format
- password: mandatory, string
- name: mandatory, string
- phone: string
- address: string
- artist: string, if the user is an artist send value "1" else "0" 

For the password there are the following checks:
- length must be grater then 8
- must contains minimum 4 lowercase letters
- must contains minimum 2 Uppercase letters
- must contains minimum 1 number
- must contains minimum 1 symbol
- 

/auth/login

POST

body params:
- userName: mandatory , string
- password: mandatory , string

If succes it generates a key that contains userName, email and id of user.

/api//general/materials/add

POST

body params:
- name: mandatory , string


/api//general/surfaces/add

POST

body params:
- name: mandatory , string


/api/general/materials

GET

returns an array of objects :
[
    {
        "id": 1,
        "name": "The name of the material"
    }
]

/api//general/surfaces

GET

returns an array of objects :
[
    {
        "id": 1,
        "name": "The name of the surface"
    }
]



/api/general/dimensions
GET
returns an array of objects:
[
    {
        "id": "3",
        "name": "small",
        "min_area": "0",
        "max_area": "100"
    }
]

/api/general/dimensions/add
POST
body params all mandatory:
{
    "name": "small",
    "min_area": "0",
    "max_area": 100
}

for me:


ip route show | grep -i default | awk '{ print $3}'

172.29.176.1\

pg_hba.conf
host  all  all 0.0.0.0/0 md5
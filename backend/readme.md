API

/auth/register

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
# Task Tracker
#### This is a web application that allows you to track the tasks once you open the website, 21/06/2019.
#### By **ANUM ASIF**
## Description
This application has been developed for a busy person to track the tasks running at the particular moment. A user can click on the report button to track the tasks. This website has been created by using a Django REST API framework. And to consume the API, AJAX has been used at the front end.
## Setup/Installation Requirements
- Python 3.6
- Django Framework
- HTML, CSS, JavaScript and Bootstrap
- PostgreSQL
- python virtual environment
## Running the Application
   * To run the application, in your terminal:

    1. Clone or download the Repository
    2. Create a virtual environment
    3. Read the requirements file and Install all the requirements. Or run pip3 install -r requirements.txt to automatically install all the requirements
    4. Prepare environment variables
    -export DATABASE_URL='postgresql+psycopg2://username:password@localhost/blog'
    -export SECRET_KEY='Your secret key',etc
    5. Run initial migration
    python3.6 manage.py makemigrations tracker
    python3.6 manage.py migrate
    6. Run the application
    python3.6 manage.py runserver
    7. Access the application through `localhost:8000`
### Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 
## Known Bugs
If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/AnumAsif/neighbourhood-updates/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/AnumAsif/neighbourhood-updates/issues/new). Please include sample queries and their corresponding results.
## Technologies Used
- This project was generated with [Python3.6](https://devdocs.io/python~3.6/) and using [Django](https://docs.djangoproject.com/en/2.1/) framework
## Support and contact details
Please feel free to contact me if you have any suggestion for me to improve this website.
- Email: anum@cockar.com
## Link to Github Repository
- [Task Tracker](https://github.com/AnumAsif/task-tracker)
### License
*MIT*
Copyright (c) 2019 **ANUM ASIF**
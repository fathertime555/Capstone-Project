# Capstone-Project

Group 5 - 2022

## How To Start The App
### Without foreman
- step 1: Open a terminal in the main project folder.
- step 2: run- python manage.py tailwind start
- step 3: Open another terminal in the main project folder.
- step 4: run- python manage.py runserver

To close the app control c in each terminal. 

Note that you need to keep both terminals running while you want to view the app.

### With foreman
- step 1: open a terminal in the project directory
- step 2: run - foreman start

Here is how to install foreman if you use UNIX system
https://formulae.brew.sh/formula/foreman

If you dont have brew install it.

If most people have windows only then I can set something up to automate the two commands.

Maybe we can also use pyinfra. https://pypi.org/project/pyinfra/

## What to expect

right now I have - Note local host is dependant on your machine.
- localhost/
- localhost/accounts/login
- localhost/accounts/register
- localhost/accounts/profile
- localhost/accounts/logout

I think that is it. There are some other accounts/ that we inherited with the built ins for user athentication

Make sure you read this doc in particular so you know how to make a superuser for yourself.
https://docs.djangoproject.com/en/4.1/topics/auth/default/

The menu buttons dont work yet except for home.

All forms require that you input everything for it to be valid. It should state that "this feild is required",
but doesn't tell you which one yet.

Profile uploads do indeed work and are attached to the specific user. However they all go in the uplodas but the gitignore
should not upload them to except for the one I just did. (Will delete later)
### CSS / theme folder
The theme folder is where all the tailwind lives

Yes node is installed and needed to manage tailwind. Its all contained in theme

I have not used any of the templates yet you have made but will see in the furture how to intergrate them.

### base.html 
This is the html file that for right now all pages have by default. It currently contains only the menubar.

base.html is located in theme/templates/base.html

Feel free to look at users/templates/welcome.html this is my best example of how to set up your html pages.

This is also showing you how to use the context block. If you do not know what that is I should have a Doc listed below regarding it.

### users

This should have all the code that I wrote for the user athentication and should show you how to write forms, urls,
models, and so on.

### listings

This is where all the logic for the create a listing and all the other 
logic for listings should go.

### SpiffoList

This is the main application folder where wsgi.py and settings.py are located.

You will mainly go here when if you need to map your urls.

For example you should add a listings/ path and then do any extra routing within listings/urls.py

## Poetry

Poetry is a tool for dependency management and packaging in Python.

- Docs https://python-poetry.org/docs/

## Django Docs

- Main Django Doc https://docs.djangoproject.com/en/4.1/
- Django Web Forms Doc https://docs.djangoproject.com/en/4.1/topics/forms/
- Class-based views https://docs.djangoproject.com/en/4.1/topics/class-based-views/
- Models and Databases https://docs.djangoproject.com/en/4.1/topics/db/
- URL dispatcher https://docs.djangoproject.com/en/4.1/topics/http/urls/#example
- Writing Test https://docs.djangoproject.com/en/4.1/topics/testing/overview/
- User authentication https://docs.djangoproject.com/en/4.1/topics/auth/
- Customizing authentication in Django https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
- The Django template language https://docs.djangoproject.com/en/4.1/ref/templates/language/
- Templates https://docs.djangoproject.com/en/4.1/topics/templates/
- Making queries https://docs.djangoproject.com/en/4.1/topics/db/queries/
- django-admin & manage.py (terminal commands) https://docs.djangoproject.com/en/4.1/ref/django-admin/
- CSRF protection https://docs.djangoproject.com/en/4.1/howto/csrf/
- Migrations https://docs.djangoproject.com/en/4.1/topics/migrations/
- Meta (Used in forms) https://docs.djangoproject.com/en/4.1/ref/models/options/
- 
Let mw know if there if more common ones we should add.

## Tail Wind / CSS

A utility-first CSS framework packed with classes like flex
- Tailwind Docs https://tailwindcss.com/
- django-tailwind Docs https://django-tailwind.readthedocs.io/en/latest/

Note tailwind & django-tailwind - Already installed 

## DaisyUI tailwind plugin

- daisyui Docs https://daisyui.com/

Note - Already installed



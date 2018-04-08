# Travel Application

## API

Written in python using flask package.

### Setup database 

`sqlite3 articles.db < schema.sql`

If you want to insert dummy data, run `sqlite3 articles.db < insert.sql`

### Run server

Run `python api/main.py` to launch server

## UI

UI was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Deployment 

### Front-end

`ng build --prod`
`scp -r dist/* pi@192.168.0.10:/var/www/html/`

### Back-end

Do not forget to setup properly UPLOAD_FOLDER in main.py

`scp -r api/main.py  pi@192.168.0.10:/home/pi/api/main.py`

```
export FLASK_APP=main.py
flask run --host=192.168.0.10
```

## Further help

To get more help on Flask check out the [Flask doc](http://flask.pocoo.org/)
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




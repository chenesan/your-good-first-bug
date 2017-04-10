# [your-good-first-bug](http://yourgoodfirstbug.yishan.toys)

A website collecting beginner-friendly bugs on github.

## Build

### For development

`npm i`

### For production

```
npm i --only=production
npm run production-build
```

## Run

### Frontend only

`npm run dev-hot`

### With express backend and SASS browsersync

```bash
# First setup your environment variable in `dev-env.sh`. 
source dev-env.sh
# start express backend, run on port 3000
npm run express.
# start SASS browserSync by gulp, this will run on port 3001
npm run express-gulp
```

### production

```bash
# First checkout production branch
git checkout production
# If you haven't built production build, build it.
npm run production-build
# run on express backend with built bundle, this will run on port 3000.
npm run production
```
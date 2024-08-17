    integrateConfig (object) {
        for (let key in object) {
            this[key] = object[key];
        }
    }

    validateConfig (requirements) {
        for (let key of requirements) {
            if (!this[key]) {
                throw new Error('Requirement not met for class ModuleLoader');
            }
        }
    }

    walkSync(dir, filter = /\.js$/, filelist = {}) {

        let files = this.fs.readdirSync(dir);
    
        for (const file of files) {
            let path = dir + '/' + file;
            if (this.fs.statSync(path).isDirectory()) {
                filelist = this.walkSync(path, filter, filelist);
            } else if (filter.test(path)) {
                filelist[file.replace(filter, '')] = path;
            }
        }
        return filelist;
    }


    console.time('Total load time');

process.on('warning', warning => {
    console.warn(warning);
    process.exit(1);
});



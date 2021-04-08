const Vinyl = require('vinyl')
const PluginError = Vinyl.PluginError
const through = require('through2')

const pluginName = 'gulp-datasrc-html'

module.exports = function (set = false) {
    let ignore = set.ignore || false
    let tags = set.tags || 'header'
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file)
            return
        }

        if (file.isStream()) {
            cb(new PluginError(pluginName, 'Streaming not supported'))
            return
        }

        try {
            let pictureRender = function (sourceTag) {
                return sourceTag
            }

            let imgRender = function (imgTag) {
                return imgTag
            }

            let inIgnore = false

            const data = file.contents
                .toString()
                .split('\n')
                .map(function (line) {
                    // Вне <header/>?
                    if (ignore) {
                        if (line.indexOf(`<${tags}`) + 1) inIgnore = true
                        if (line.indexOf(`</${tags}`) + 1) inIgnore = false
                    }

                    // Проверяем есть ли <img> и <source>
                    if (
                        (line.indexOf('<source') + 1 && !inIgnore) ||
                        (line.indexOf('<img') + 1 && !inIgnore)
                    ) {
                        // собираем img
                        let ReImg = /<img([^>]*)src=\"(\S+)\"([^>]*)>/gi
                        let regexpArrayImg = ReImg.exec(line)
                        let imgTag = ''
                        if (regexpArrayImg) {
                            imgTag = regexpArrayImg[0]
                        }
                        // меняем src на data-src в img
                        let newImgHTML = imgRender(imgTag.replace(/src|data-src/g, 'data-src'))

                        // собираем source
                        let ReSource = /<source([^>]*)srcset=\"(\S+)\"([^>]*)>/gi
                        let regexpArraySource = ReSource.exec(line)
                        // проверяем на наличие source
                        if (regexpArraySource) {
                            let sourceTag = regexpArraySource[0]
                            // меняем srcset на data-srcset в source
                            let newSourceHTML = pictureRender(
                                sourceTag.replace(/srcset|data-srcset/g, 'data-srcset')
                            )
                            return line.replace(sourceTag + imgTag, newSourceHTML + newImgHTML)
                        }
                        return line.replace(imgTag, newImgHTML)
                    }
                    return line
                })
                .join('\n')
            file.contents = new Buffer.from(data)
            this.push(file)
        } catch (err) {
            this.emit('error', new PluginError(pluginName, err))
        }

        cb()
    })
}

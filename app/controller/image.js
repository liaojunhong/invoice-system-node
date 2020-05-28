const Image = require('../models/image');
const fs = require('fs');
// const ImageWirteStream = fs.createWriteStream('test.txt');

exports.upload_img = async function (req, res) {
    // console.log(req.body);
    try {
        const image = new Image({ img: req.body })
        // ImageWirteStream.write(req.body,)
        await image.save();
        return res.send({ stat: 0, msg: 'success',data: image._id})
    } catch (err) {
        console.log(err);
        res.send({ stat: 1000, msg: '上传失败' })
    }

}
exports.get_img = async function (req, res) {
    // console.log(req.body);
    try {
        console.log(req.params.id.slice(0, -4))
        const image = await Image.findById(req.params.id.slice(0, -4))
        // console.log(image);
        const imgStr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC"
        
        const imgBuffer = Buffer.from(imgStr, 'base64')
        res.type('png');
        // return res.send(image.img)
        return res.send(imgBuffer)
    } catch (err) {
        console.log(err)
        res.send({ stat: 1000, msg: '获取失败' })
    }

}
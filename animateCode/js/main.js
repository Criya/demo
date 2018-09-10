var css1 = `*{
    transition: all .3s;
}
/*来个边框*/
#codeZone{
    background: rgb(222, 222, 222);
    border: 1px solid red;
    padding: 16px;
}
/*代码高亮*/

.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color:#DD4A68;
}
.token.comment{
    color:slategray;
}

/* 360度旋转 */
*{
    transform: rotate(360deg);
}

/* 一张白纸 */
#paper{
    position:fixed;
    width: 50%;
    height: 100%;
    right: 0;
    background: grey;
    display: flex;
    justify-content: center;
    align-iterms: center;
    padding: 16px;
}
#codeZone{
    position:fixed;
    width: 50%; 
    left: 0;
}

`
var css2 = `.content{
    width: 100%;
    height: 100%;
    background: white;
}
`
var md = `# TEST`
function createPaper(){
    var paper = document.createElement("div");
    var content = document.createElement("pre");
    content.className="content"
    paper.id = "paper";
    paper.appendChild(content);
    document.body.appendChild(paper);
}


function writeCss(prefix, code, fn) {
    let domCode = document.querySelector('#codeZone')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        myStyle.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 10)
}

function writeMarkdown(md, fn){
    debugger
    let markdown = document.querySelector("#paper>.content")
    let n = 0
    let id = setInterval(() => {
        n += 1
        markdown.innerHTML = md.substring(0, n)
        markdown.scrollTop = markdown.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 10)
}

writeCss('', css1, ()=>{
    createPaper()
    writeCss(css1, css2,writeMarkdown(md))
})
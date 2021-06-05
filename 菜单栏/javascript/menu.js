window.onload = function() {
    var right = document.getElementById("box");
    right.style.display = "none";  //初始隐藏
    console.log("yes");
    document.oncontextmenu = function(event) {
        var event  = event || window.event;   //兼容低版本浏览器
	event.preventDefault();               //屏蔽浏览器自带的右击事件
        right.style.display = "block";  //鼠标右击后显示出来
        right.style.top = event.clientY + "px";  
        right.style.left = event.clientX + "px";  //获取鼠标坐标   
    }
    document.onclick = function() {
        right.style.display = "none"; //再次点击隐藏
    }
}
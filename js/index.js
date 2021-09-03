$(function () {
    load();

    $("#title").on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if ($(this).val() == "") {
                alert("请输入内容");
                return;
            }

            let data = {
                title: $(this).val(),
                done: false
            };

            let local = getData();
            local.push(data);

            saveData(local);

            load();
            $(this).val("");

        }

    })

    $("#todolist, #donelist").on("click", ".del", function () {
        let data = getData();

        data.splice($(this).attr("data-index"), 1);
        saveData(data);
        load();
    })

    $("#todolist, #donelist").on("click", ".checkbox", function () {
        var data = getData();
        let index = $(this).siblings(".del").attr("data-index");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    })

    function getData() {
        let local = localStorage.getItem("todolist");
        if (local != null) {
            return JSON.parse(local);
        } else {
            return [];
        }

    }

    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        let data = getData();

        $("#todolist").empty();
        $("#donelist").empty();

        let todocount = 0,
            donecount = 0;
        $.each(data, function (i, n) {
            if (n.done) {
                $("#donelist").prepend("<li><input type='checkbox' class='checkbox' checked='checked'><p>" +
                    n.title + "</p><a href='javascript:;' class='del' data-index = " + i + ">-</a></li>");
                donecount++;
            } else {
                $("#todolist").prepend("<li><input type='checkbox' class='checkbox'><p>" +
                    n.title + "</p><a href='javascript:;' class='del' data-index = " + i + ">-</a></li>");
                todocount++;
            }

        })
        $("#todocount").html(todocount);
        $("#donecount").html(donecount);
    }
    // var p = document.querySelectorAll("li p");
    // p.forEach((value) => {
    //     value.addEventListener('dblclick', function () {
    //         this.innerHTML = "<input type='text' class='p'>";
    //         let ipt = value.children[0];
    //         ipt.addEventListener('blur', function () {
    //             let arr = getData();
    //             let index = this.parentNode.nextElementSibling();
    //             console.log(arr[index])
    //         })
    //     })


    // })

    var p = $("li p");
    $.each(p, function (i, ele) {
        let flag = true;
        $(ele).on("click", function () {
            if (flag) {
                var inner = $(this).html();
                $(this).html("<input type='text' class='p'>");
                let ipt = $(this).children()[0];
                $(ipt).val(inner);
                $(ipt).select();
                flag = false;
            }

        });
        $(ele).on("blur", "input", function () {
            let data = getData();
            let index = $(this).parent().siblings("a").attr("data-index");
            data[index].title = $(this).val();
            saveData(data);
            $(ele).html($(this).val());
            flag = true;
            // load();
        })
        $(ele).on("keyup", "input", function (e) {
            if (e.keyCode === 13) {
                $(this).blur();
                flag = true;
            }
        })

        // $(ele).on("mousedown", function (e) {
        //     e.preventDefault();
        // })

    })

})
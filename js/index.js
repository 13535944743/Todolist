$(function () {
  let flag = true

  load()

  $('#title').on('keypress', function (e) {
    if (e.keyCode == 13) {
      e.preventDefault()
      if ($(this).val() == '') {
        alert('请输入内容')
        return
      }

      let data = {
        title: $(this).val(),
        done: false,
      }

      let local = getData()
      local.push(data)

      saveData(local)

      load()
      $(this).val('')
    }
  })

  $('#todolist, #donelist').on('click', '.del', function () {
    let data = getData()

    data.splice($(this).attr('data-index'), 1)
    saveData(data)
    load()
  })

  $('#todolist, #donelist').on('click', '.checkbox', function () {
    var data = getData()
    let index = $(this).siblings('.del').attr('data-index')
    data[index].done = $(this).prop('checked')
    saveData(data)
    load()
  })

  function getData() {
    let local = localStorage.getItem('todolist')
    if (local != null) {
      return JSON.parse(local)
    } else {
      return []
    }
  }

  function saveData(data) {
    localStorage.setItem('todolist', JSON.stringify(data))
  }

  function load() {
    let data = getData()

    $('#todolist').empty()
    $('#donelist').empty()

    let todocount = 0,
      donecount = 0
    $.each(data, function (i, n) {
      if (n.done) {
        $('#donelist').prepend("<li><input type='checkbox' class='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' class='del' data-index = " + i + '>-</a></li>')
        donecount++
      } else {
        $('#todolist').prepend("<li><input type='checkbox' class='checkbox'><p>" + n.title + "</p><a href='javascript:;' class='del' data-index = " + i + '>-</a></li>')
        todocount++
      }
    })
    $('#todocount').html(todocount)
    $('#donecount').html(donecount)
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

  const p = $('li p')
  $.each(p, function (i, ele) {
    let flag = true //用来解决点击计划，准备修改时，再次点击时还会触发的bug
    let flag1 = true //用来解决点击计划，变为input，之后input失去焦点时会跟着再次触发p的click事件的bug
    $(ele).on('click', function () {
      if (flag && flag1) {
        var inner = $(this).html()
        $(this).html("<input type='text' class='p'>")
        let ipt = $(this).children()[0]
        $(ipt).val(inner)
        $(ipt).select()
        flag = false
      }
      flag1 = true
    })
    $(ele).on('blur', 'input', function () {
      let data = getData()
      let index = $(this).parent().siblings('a').attr('data-index')
      data[index].title = $(this).val()
      saveData(data)
      $(ele).html($(this).val())
      flag = true
      flag1 = false
      // load();
    })
    $(ele).on('keyup', 'input', function (e) {
      if (e.keyCode === 13) {
        $(this).blur()
        flag = true
      }
    })

    // $(ele).on("mousedown", function (e) {
    //     e.preventDefault();
    // })
  })

  const clearall = $('.clearall')
  clearall.click(function () {
    saveData([])
    load()
  })
})

# 基于jQuery和Local Storage制作的仿ToDoList
原有功能：
1. 增加ToDo
2. 删除ToDo
3. 修改ToDo
4. 清空ToDo
5. 变更ToDo的状态

新增功能和解决bug
1. 修改ToDo时可以Enter结束，而不需要每次都动用鼠标
2. 利用**节流阀**技术解决原ToDoList的bug:
    修改ToDo时，如果不是使用直接使用键盘修改整条数据，
    而是使用鼠标去进行局部修改时，会出现，把数据修改
    为input标签
    
 **技术要点**：
 数据存放在Local Storage中，每次数据需要增删改时，是先从Local Storage
 中得到数据，更新数据后再重新保存到Local Storage中，而渲染DoM时则是直接把从
 Local Storage得到数据渲染上去。

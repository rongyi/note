# emacs 下markdown文件编辑 #

## 插入heading ##

`C-c C-t n` n从1-6，表示各级标题。当光标在heading行时可以用`C-c C--`和`C-c C-=`去调整heading的级别。另外可以用`C-c C-n` `C-c C-p` `C-c C-f` `C-c C-b` `C-c C-u`在heading之间移动。

## 样式 ##
* `C-c C-s e` 斜体
* `C-c C-s s` 粗体
* `C-c C-s c` 插入代码

## 超链接 ##
`C-c C-a l`插入`[]()`形式的链接，`C-c C-a L`插入`[LinkText][Lebel]`形式的链接。

## 插入image ##
`C-c C-i i`插入图片

## misc ##
* `C-c -`插入水平线
* `C-c <` `C-c >` shift the region

## reference ##
* [markdown][markdone]

[markdone]: http://jblevins.org/projects/markdown-mode/ "markdown"

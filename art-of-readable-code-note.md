---
layout: post
title: 《The art of readable code》笔记
excerpt: 读书笔记
---


# 前言 #

入职新公司，接收前任留下的code，觉得有些凌乱，于是乘势带着学习的心态又把整个代码重写了遍。期间又把去年度过的这本书拿过来重读了一遍，这本书举的例子是作者平时的一些总结，作为顶尖互联网公司(Google)的工程师对自己的一些“反省”，我觉得还是有普遍性的，很值得学习。

# 写代码的原则 #

> Code应该让别人花尽可能短的时间看懂/理解。

不由得想起这句名言

> Programs must be written for people to read, and only incidentally for machines to execute.
>
> - Abelson & Sussman, SICP, preface to the first edition

所以写代码的同时应该具有一种对可能看你代码的人的一种同情心，推己及人，站在阅读者的角度考虑一下，也许多思考一下加些**该加**的注释，或许会让看你代码的人少些痛苦，如果能多些愉悦，那就谢天谢地了。

作者还提到一句比较本质的话摘录在这里：

> Engineering is all about breaking down big problems into smaller ones and putting the solutions for those problems back together
> author of this book

该书有小到大展开，各章节如下：

# 变量名  #

Joshua Bloch在设计Java API时，身边总会放一本字典，（《Coders at works》p172）可见其对名字的重视程度。作为可读性的基石，变量名直接决定了代码质量的好坏。总结了一些：

* i/j/k不应该在循环变量之外出现这样的变量名。而且嵌套循环时还要考虑尽量不要用这样的变量名，因为如果取错index的话很难debug出来，而带有意义的index则一样就能看出来取错index了。

* temp/tmp/ret 仅用在显而易见的短的范围内，作为函数的返回值或者临时变量，除此之外杜绝使用。

* 将变量附带一些信息：
  + 附带类型： 如_str, _arr， _p等
  + 如果是测量性质的最好带上单位： max_file_size_mb
  + 约束性质的最好带上边界词： max_xxx, min_xxx
  + 半开半闭区间的边界值变量：begin, end
  + 闭区间的边界值变量： first, last
  + 布尔变量带上： is, has, can, should让人一眼明了
  + 定义的位置： 不要先定义一大坨变量放在那里，用到的时候再定义也不迟。
 
# 代码风格 #
  
参见[kernel style](https://github.com/torvalds/linux/blob/master/Documentation/zh_CN/CodingStyle "kernel coding style")


* 注释原则

    > 好代码 > 烂代码 + 好注释

所以优先考虑写好代码然后再考虑写好注释的事。

* 用TODO（要干的）/FIXME(已知不完美的)/HACK(承认写的挫的）

* 传参时有需要可以加inline注释
	log_new_file(file_name, /\* max_file_count= \*/10, /\*max_file_size_mb=\*/10)
  这样别人就不用再去看API找这两个参数什么意思了
  
# control flow方面 #

* 不要使用 do while （宏里面除外）

* if/else处理先后原则：
  + 先处理positive
  + 先处理简单
  + 先处理最interesting的
  
# 将大的表达式简化 #

* 考虑用一个“cache”变量缓存大的表达式
* 考虑用宏替换一些重复的代码


# less code #

又一句牛逼的话：

> The most readable code is no code at all

映衬了这句话：

> Less is more
>
> 建筑大师：路德維希·密斯·凡德羅

所以：

* 不要舍不得代码，觉得辛辛苦苦写的，该丢的丢，该删的删。要大气
* 尽量多些通用的utility代码库，然后删除重复的部分
* 将项目划分为正交的子项目
* 对codebase的大小心里要有数
* 没事看看你用的语言的API，找找感觉，下次有什么需求时就会想到有API而不是在那重复造轮子了。

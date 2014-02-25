# Linux kernel development重读笔记 #

## ch02 overview##
编译kernel:

    make menuconfig
    make defconfig
    每次编译之前必敲：
    make oldconfig
    make时只想关注错误信息
    make > /dev/null

## ch03进程管理 ##
OS提供两个抽象:

> A virtualized processor and virtual memory. The virtual processor gives the process the illusion that is alone monopolizes the system, despite possibly sharing the processor among hundreds of other processes. Virtual memory let the process allocate and manage memory as if it alone owned all the momory in the system.

需要注意的是Linux的threads共享share memory的抽象，但是每个线程都各自拥有虚拟化的processor。

进程始于`fork()`终于`exit()`。

kernel stack的大小：一般是page的2倍。即stack在32位上为8KB，64位上为16KB

linkage什么意思？

    首 先作为linux操作系统,它不一定就只运行在X86平台下面,还有其他平台例如ARM,PPC，达芬奇等等，所以在不同的处理器结构上不能保证都是通过 局部栈传递参数的，可能此时就有朋友就会问：不放在栈中能放在哪里呢？熟悉ARM的朋友一定知道ARM对函数调用过程中的传参定义了一套规则，叫 ATPCS（内地叫AAPCS），规则中明确指出ARM中R0-R4都是作为通用寄存器使用，在函数调用时处理器从R0-R4中获取参数，在函数返回时再 将需要返回的参数一次存到R0-R4中，也就是说可以将函数参数直接存放在寄存器中，所以为了严格区别函数参数的存放位置，引入了两个标记，即 asmlinkage和FASTCALL，前者表示将函数参数存放在局部栈中,后者则是通知编译器将函数参数用寄存器保存起来

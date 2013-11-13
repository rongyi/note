# masscan源码分析 #

## 简介 ##

HN上看到masscan的简介，作者号称这是世界上最快的端口扫描程序（三分钟扫描整个互联网）。而且这还是开源的，难免勾起自己的兴趣所以学习了一下。


## 调试前准备 ##

获取源码：
    git clone https://github.com/robertdavidgraham/masscan.git

拉高调试级别,编辑`src/logger.c`文件，将`global_debug_level`的值调高一点，尽可能多的打印信息方便跟踪源码。

调整编译参数，修改`Makefile`将`CFLAGS`选项中的`O3`改为`O0`，这样在gdb中就不会因优化而跳来跳去，而是顺着源码一步步走下去。

编译

参数设置：先选择扫描简单的UDP，参数设置如下：
    192.168.1.0/24 -p u:53

## 组件简介 ##

只能很粗略的说下代码路径。

### 参数处理 ###

入口： `masscan_command_line`

读命令行参数解析，初始化运行时的一个参数设置巨型结构体，此结构体包含了所有运行时信息，并且会将此信息以只读形式传递到收发线程中。

IP range处理： `masscan_set_parameter`

这个函数全权负责参数的处理。第二个参数代表着不同的行为，是初始化ip range还是port还是其他的都通过此参数实现。以上述参数调用时的实参情况： `masscan_set_parameter(masscan, "range", "192.168.1.0/24")`。然后通过调用`range_parse_ipv4`函数产生IP段并挂到全局参数上。

port range处理： `masscan_set_parameter(masscan, "ports", "u:53")`
调用`rangelist_parse_port`。masscan对不同类型的port通过一个enum将port全部映射到unsigned int上。区间如下：

    src/tmpl-port.h
    enum {
    	Templ_TCP = 0,
      	Templ_UDP = 65536,
      	Templ_SCTP = 65536*2,
       	Templ_ICMP_echo = 65536*3+0,
       	Templ_ICMP_timestamp = 65536*3+1,
       	Templ_ARP = 65536*3+2,
    };


### 发送channel的初始化 ###

raw socket的初始化，我没有用pfring，走熟悉的pcap流程。
    raw_sock_init()

随机数种子的设置

snmp相关初始化。



### 根据配置信息决定具体行为 ###

main函数中最后的switch中根据`massscan->op`决定具体的行为，是list help还是test，还是scan行为。这里只关注scan行为函数`main_scan`

### scan的过程 ###

开线程，一个发一个收。

scan的启动过程：
1. `payload_trim` 根据扫描的端口去除一些不必要的payload模板以加速访问需要的payload的速度。顺便提下payload的初始化过程。在main开始部分`payload_create`用的是`tmpl-payloads.c`中的一些预定义的硬编码的payload数组。

2. 初始化网卡: `masscan_initialize_adapter`，调用的函数有：

        rawsock_get_default_interface
        rawsock_get_adapter_ip
        rawsock_get_adapter_mac
        rawsock_init_adapter
        rawsock_ignore_transmit
        rawsock_get_default_gateway # 通过netlink获取第一跳IP地址
        arp_resolve_sync #通过arp获取第一跳路由的mac

3. 初始化packet模板： `template_packet_init`， 分tcp/udp/等，在`templ-pkt.[hc]`中。

4. 开启发送线程： `transmit_thread`，此线程中调用的`rawsock_send_probe` `tempate_set_target`是理清头绪的关键。特别是后一个函数，怎样获取模板更改对应的IP/port后重新计算各层的checksum，大概脉络一下就清晰。

5. 开启接收线程： `receive_thread`，此线程中用recv接收frame之后调用`preprocess_frame`来解析frame。通过parsed的结果来区别什么协议，然后上对应handle。比如`handle_icmp` `handle_udp`默认handle tcp，所以不要去搜索这个函数，在recv中是tcp是直接跳出switch。

## 没看的地方 ##

1. smack
2. syn cookie的创建过程（扫描过程的session）以及匹配的过程。
3. range乱序的算法。
   

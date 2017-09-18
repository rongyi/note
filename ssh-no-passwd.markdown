

# SSH快速连接 #

开发时候经常会ssh登陆到另外一台主机上进行相关操作，一般这么做：

    ssh root@192.168.6.175
    # 然后输入密码


每一次都这么做有点费神费力，其实还可以有更快速的方式来进行这样的连接。 下文详细叙述。

## 新建配置文件 ##

新建`~/.ssh/config`文件，在文件里配置某台服务器。

    Host test175
        HostName 192.168.6.175
        User root


这时你就不必再记得具体的IP地址，直接：

    ssh test175

这个时候你还是要输入密码，有没有办法不输入密码？有的，把你的key放到要连接的服务器上即可。

    ssh-copy-id test175
    #输入密码，

最终，你只需要轻松敲入：

    ssh test175


note: when update a ssh key, please update ssh key:

ssh-add

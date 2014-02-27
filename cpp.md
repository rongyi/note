# cpp0x11 reading note #

## from slideshare ##

use anonymous namespaces for private free-standing functions.

do not inline stuff in the class definition.在class定义之外的头文件中另外写，不过我看C++的作者书上也没有这么要求过。

    inline int Foo::value() const {
        return value_;
    }

in C++ you do not need to explicitly return from main.

# 一、探索z-index

在正常的文档流（Document Flow）中，盒子是按照从上往下（x轴⬇️）或者从左往右（y轴➡️）方式排列，但是css一些规则（float/postition:absolute等）能让盒子脱离标准流，使元素漂浮在以x、y轴形成的平面上（标准流），从而引出z轴概念；当这些元素发生重叠时，谁在谁之上呢？

要回答这个问题，我们需要进一步地理解`z-index`是如何工作的，尤其是层叠上下文，以及层叠次序这些概念。

## 1. 名词解释

**层叠上下文（stacking context）**：类似块状格式上下文（BFC），是遵循一定规则的、独立的环境，我的理解是如果元素是层叠上下文，那就比普通元素离我们(z轴)更近一点

![](https://nio.feishu.cn/space/api/box/stream/download/asynccode/?code=MjJhMjIxZjE3OWJiYTZlZjcxMDM0YjA5MzVmYzgwMDhfamk1Z1BSRnM4TE5PeU1IOEhycmlPeTJkUlFQOHpzb3ZfVG9rZW46Tlo0eGJEODJ2b25WVXF4SUxSWWNSVk9LbmNmXzE3NDY1OTQ3ODA6MTc0NjU5ODM4MF9WNA)

层叠上下文1 (Stacking Context 1)是由文档根元素形成的， 层叠上下文2和3 (Stacking Context 2, 3) 都是层叠上下文1 (Stacking Context 1) 上的层叠层。 他们各自也都形成了新的层叠上下文，其中包含着新的层叠层。

和BFC一样，只要节点元素满足以下任一条件，它就是一个层叠上下文：

* 根元素（HTML）

* z-index不为aut&#x6F;*&#x20;*&#x7684;绝对定位和相对定位元素

* fixed 定位元素和sticky定位元素

* z-index不为auto的flex item

* z-index不为auto的grid item

* opacity小于1的元素

* transform不为none的元素

冷门属性：

* 元素`mix-blend-mode`值不是`normal`

* 元素的`filter`值不是`none`

* 元素的`isolation`值是`isolate`

* `will-change`指定的属性值为上面任意一个

* 元素的`-webkit-overflow-scrolling`设为`touch`



**叠层水平（Stacking Level）：**&#x51B3;定了同一个层叠上下文中元素在z轴上的显示顺序

> 普通元素的层叠水平优先由其所在的层叠上下文决定
>
> 层叠水平的比较只有在当前层叠上下文元素中才有意义

需要注意的是，千万不要把层叠水平和CSS的`z-index`属性混为一谈。某些情况下`z-index`确实可以影响层叠水平，但是，只限于定位元素以及Flex盒子的孩子元素；而层叠水平所有的元素都存在。

```json
root
    div#1 z-index 5（省长）
    div#2 z-index 2（区长）
    div#3 z-index 4（市长）
        div#4 z-index 6
        div#5 z-index 1
        div#6 z-index 3
```

![](https://nio.feishu.cn/space/api/box/stream/download/asynccode/?code=NWM1MzBjYmUxY2FiNDIzMDFmNmUwYzhiNjY1Y2M1ZDZfUlFaWEpvSm5ielhNaHNlRjFYNVhva1d2YU9jUUVvUzZfVG9rZW46RUlzaGI1VENQb3pUU2Z4dmkzd2NVVURMbmlnXzE3NDY1OTQ3ODA6MTc0NjU5ODM4MF9WNA)

**层叠顺序（Stacking Order）: 前面两个是概念，层叠顺序是规则。**&#x5728;HTML文档中，默认情况之下有一个自然层叠顺序（Natural Stacing Order），即元素在`z`轴上的顺序。它是由许多因素决定的。比如下面这个列表，它显示了元素盒子放入层叠顺序上下文的顺序，从层叠的底部开始，共有七种层叠等级：

![](https://nio.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI4ZDQ3MjBkMDA1NzhjNGE4YmRmM2FjZjNkYmMxMjFfMnhTNHVaUmpTTVF1M2h6dENPd25Jd3luTWR4VW1lc3BfVG9rZW46QUN0OWJlQnpyb2Q2UUx4bEw1VGNNREp6bjljXzE3NDY1OTQ3ODA6MTc0NjU5ODM4MF9WNA)

## 2. 层叠准则

* **谁大谁上：**&#x5F53;具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。

* **后来居上：**&#x5F53;元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。

## 3. z-index

适用于：已经定位的元素（即position:relative/absolute/fixed）

取值：

# 三、参考文档

大漠老师：https://zhuanlan.zhihu.com/p/41516699

张鑫旭老师：<https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/>

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index>
<https://developer.aliyun.com/article/49815>

https://blog.csdn.net/chern1992/article/details/107073184/

https://zhuanlan.zhihu.com/p/489893280

https://developer.aliyun.com/article/49815








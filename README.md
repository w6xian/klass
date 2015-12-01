# klass
javascript 面向对象编程实现，继承，父类方法，接口。
关键字：klass      类定义  new klass({});<br />
        extend     继承    <br />
		init       构造函数<br /><br />
        this.supr  调用父类方法<br />
        test       实现接口 {接口名：类型} 类型：{}对应object,ovt <br />数字对应number，function(){}对应函数，""对应字串。<br />

公共方法：第一个字母为大字的时，该方法为公共方法，可以被继承。

## 接口 定义的都是公共方法，第一个字母需要大写
``` js
var IPeople = {
	 Wc:function(){}
	,PaPa:function(){}
	,Hi:function(){}
}
```

##定义类，并实现构造函数和接口

``` js
var Peopel = new klass({
	//构造函数
	init:function(name,age){
		this.name = name;
		this.age  = age;
	}
	//实现接口
	,PaPa:function(){
		console.log("啪啪.啪");
	}
	,Wc:function(){
		console.log("去茅厕");
	}
	,Hi:function(){
		console.log("hi , 我是" + this.name + ".我" +this.age+ "了");
	}

//强制实现IPeople接口
}).test(IPeople);
```

### 子类
``` js
var Man = People.extend({
	init:function(name,age){
		 this.supr(name,age);
	}
	,Wc:function(){
		this.supr();
		console.log("我是boy，我去男茅厕");
	}
})
var Woman = People.extend({
	init:function(name,age){
		this.supr(name,age);
	}
	,Wc:function(){
		this.supr();
		console.log("我是girl，我去女茅厕");
	}
})
```

###实例化
``` js
var leo = new Man("leo",30);
leo.PaPa();
leo.Wc();

var leona = new Woman("leona",25);
leona.PaPa();
leona.Wc();
leona.Hi();
leo.Hi();
```
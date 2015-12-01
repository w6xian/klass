/**
 * 	定义关键字klass
 *  约定：option为{}对象，其中init,为构造函数。
 */

! function(name, context, definition) {
	if (typeof define == 'function') define(definition)
	else if (typeof module != 'undefined') module.exports = definition()
	else context[name] = definition()
}('klass', this, function() {
	var klass = function(option) {
			return klass.extend.call(function() {}, option)
		}
		/**
		 * 如果是方法函数，给函数加一个关执行父类的方法
		 * 感谢klass的作者 klass: a classical JS OOP façade 
		 * https://github.com/ded/klass
		 */
	klass.__wrap = function(k, fn, supr) {
		return function() {
			var tmp = this.supr
			this.supr = supr["prototype"][k]
			var undef = {}.fabricatedUndefined
			var ret = undef
			try {
				ret = fn.apply(this, arguments)
			} finally {
				this.supr = tmp
			}
			return ret
		}
	}
	klass.__isfunc=function(fn){
		return typeof fn === "function";
	}
	klass.extend = function(option) {
		;var supr = this
		,	 tsupr = Object.create(this.prototype)
		,    fn = function() {}
		,    option = option || {};

		;if (!klass.__isfunc(option.die)) {
			option.die = function() {}
		}

		;var sup = {}
		/**
		 * 子类有父类方法的关键。
		 */
		;for (index in tsupr) {
			var charcode = index.charCodeAt(0);
			//只有第一个字母大字的才可以被继承
			if (charcode >= 65 && charcode <= 90) {
				;var fo = tsupr[index]
				;sup[index] = fo
			}
		};
		;for (index in option) {
			var fo = option[index];
			if (klass.__isfunc(fo)) {
				/**
				 * 如果是方法函数，给函数加一个关执行父类的方法
				 * 感谢klass的作者 klass: a classical JS OOP façade 
				 * https://github.com/ded/klass
				 */
				sup[index] = klass.__wrap(index, fo, supr)
			} else {
				sup[index] = fo;
			}
		}
		//模拟构造函数，如果有声明init函数，TA就是了。
		;if (typeof sup.init === "function") {
			fn = sup.init;
		}
		;fn.extend = arguments.callee
		;fn.test = function(implement) {
			/**
			 * 
			 */
			for (key in implement) {
				;var charcode = key.charCodeAt(0)
				//只有第一个字母大写才是正宗的接口
				;if (charcode >= 65 && charcode <= 90) {
					if (typeof implement[key] === typeof this['prototype'][key]) {
						continue;
					} else {
						throw "亲，你需要" + key + '，类型得还得是：' + typeof implement[key]
					}

				}
			}
			return fn
		}
		;fn.prototype = sup
		return fn
	}
	return klass;
})
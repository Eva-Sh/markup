'use strict';

var Test = {};

Test.switchTab = function () {
	$('.sidebar__list').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active').closest('.container-block').find('.main-content__page').removeClass('active').eq($(this).index()).addClass('active');
		$('.sidebar--mobile .sidebar__list').hide(300);
		if ($('.sidebar__button-menu').hasClass('sidebar__button-menu--open')) {
			$('.sidebar__button-menu').removeClass('sidebar__button-menu--open');
		}
	});
};

Test.mobileMenu = function () {
	$('.sidebar--mobile .sidebar__list').hide();
	$('.sidebar__button-menu').on('click', function () {
		if (!$(this).hasClass('sidebar__button-menu--open')) {
			$(this).addClass('sidebar__button-menu--open');
			$('.sidebar--mobile .sidebar__list').show(300);
		} else {
			$(this).removeClass('sidebar__button-menu--open');
			$('.sidebar--mobile .sidebar__list').hide(300);
		}
	});
};

Test.formValidation = function () {
	//проверка первого инпута
	$("#input1").keypress(function (e) {
		var value = $("#input1").val();
		var that = this;
		setTimeout(function () {
			var res = /[^0-9 ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
		//if (e.keyCode < 48 || e.keyCode > 57) { //не подходит для валидации в ферфоксе
		//return false;
		//}
		if (value.length >= 3) {
			$('#input2').focus();
			$("#input1").removeClass('error');
		}
	});
	//проверка вторго инпута
	$('#input2').on('keypress', function (e) {
		var value = $("#input2").val();
		var that = this;
		setTimeout(function () {
			var res = /[^0-9 ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
		//if (e.keyCode < 48 || e.keyCode > 57) {//не подходит для валидации в ферфоксе
		//return false;
		//}
		if (value.length >= 3) $('#input3').focus();
		$("#input2").removeClass('error');
	}).on('keydown', function (e) {
		if (e.keyCode == 8) {
			var value = $("#input2").val();

			if (value.length <= 0) $('#input1').focus();
		}
	});
	//проверка третьего инпута
	$('#input3').on('keypress', function (e) {
		var value = $("#input3").val();
		var that = this;
		setTimeout(function () {
			var res = /[^0-9 ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
		//if (e.keyCode < 48 || e.keyCode > 57) {//не подходит для валидации в ферфоксе
		//return false;
		//}

		if (value.length >= 3) $('#input4').focus();
		$("#input3").removeClass('error');
	}).on('keydown', function (e) {
		if (e.keyCode == 8) {
			var value = $("#input3").val();

			if (value.length <= 0) $('#input2').focus();
		}
	});
	$('#input4').on('keypress', function (e) {
		var that = this;
		setTimeout(function () {
			var res = /[^0-9 ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
		//if (e.keyCode < 48 || e.keyCode > 57) {//не подходит для валидации в ферфоксе
		//return false;
		//}
	});
	//проверка четвертого инпута
	$('#input4').on('keydown', function (e) {

		if (e.keyCode == 8) {
			var value = $("#input4").val();

			if (value.length <= 0) $('#input3').focus();
		}
	});
	//проверка события инпутов
	$('#input2').click(function () {
		var input1_value = $('#input1').val();

		if (input1_value == '') $('#input1').focus();
	});

	$('#input3').click(function () {
		var input1_value = $('#input1').val();
		var input2_value = $('#input2').val();

		if (input1_value == '') $('#input1').focus();else if (input2_value == '') $('#input2').focus();
	});

	$('#input4').click(function () {
		var input1_value = $('#input1').val();
		var input2_value = $('#input2').val();
		var input3_value = $('#input3').val();

		if (input1_value == '') $('#input1').focus();else if (input2_value == '') $('#input2').focus();else if (input3_value == '') $('#input3').focus();
	});
	//проверка инпта. ввод только англ.букв/заглавных
	$('#username').on('keypress', function () {
		var that = this;
		setTimeout(function () {
			var res = /[^A-Z ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
	});
	//проверка инпта. ввод только цифр
	$('#usercode').on('keypress', function () {
		var that = this;
		setTimeout(function () {
			var res = /[^0-9 ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
	});
	//валидация заполнения формы номера карты
	var numbercard,
	    month,
	    years,
	    username,
	    usercode,
	    Statusercode = 0,
	    Statusername = 0,
	    Statyears = 0,
	    Statmonth = 0,
	    Statnumbercard = 0;

	//ранее прошла валидация на первых трех инпутах. здесь подбираем их значения, отслеживая изменения последнего инпута.
	$('#input4').on('keypress', function () {
		var valueInput = $('#input4').val();
		if (valueInput.length === 4) {
			$("#input4").removeClass('error');
			numbercard = $('#input1').val() + $('#input2').val() + $('#input3').val() + $('#input3').val();
			Statnumbercard = 1;
		} else {
			Statnumbercard = 0;
		}
	});

	//инициация плагина для стилизации селекторов
	$('#month').niceSelect();
	$('#years').niceSelect();
	//изменяем цвет значения селекторов по умолчанию
	$('.form__input-month .current').addClass('color-white');
	$('.form__input-years .current').addClass('color-white');
	//возвращаем цвет значения селекторов
	$('.form__wrapper').delegate('.form__input-month .option', 'click', function () {
		$('.form__input-month .current').removeClass('color-white');
		if ($(this).text() !== '00') {
			$('.form__input-month').removeClass('error');
			Statmonth = 1;
		} else {
			$('.form__input-month').addClass('error');
			Statmonth = 0;
		}
	});
	$('.form__wrapper').delegate('.form__input-years .option', 'click', function () {
		$('.form__input-years .current').removeClass('color-white');
		if ($(this).text() !== '0000') {
			$('.form__input-years').removeClass('error');
			Statyears = 1;
		} else {
			$('.form__input-years').addClass('error');
			Statyears = 0;
		}
	});
	//проверка селектора с выбором месяца -- без стилизации инпутов с помощью плагинов
	/*$("#month").change(function(e) {
 if  ($("#month").val() == '') {
 	$('#month').addClass('error');
 	Statmonth = 0;
 } else {
 	$('#month').removeClass('error').addClass('ok');
 	Statmonth = 1;
 }
 });*/
	//проверка селектора с выбором года -- без стилизации инпутов с помощью плагинов
	/*$("#years").change(function(e) {
 if  ($("#years").val() == '') {
 	$('#years').addClass('error');
 	Statyears = 0;
 } else {
 	$('#years').removeClass('error');
 	Statyears = 1;
 }
 });*/
	//проверка поля имени владельца карты
	$("#username").change(function (e) {
		var valueUsername = $("#username").val();

		if (valueUsername.length <= 4) {
			$('#username').addClass('error');
			Statusername = 0;
		} else {
			$('#username').removeClass('error');
			Statusername = 1;
		}
	});
	//проверка кода
	$("#usercode").change(function (e) {
		var valueUsercode = $("#usercode").val();

		if (valueUsercode.length === 3) {
			$('#usercode').removeClass('error');
			Statusercode = 1;
		} else {
			$('#usercode').addClass('error');
			Statusercode = 0;
		}
	});

	$('.form__wrapper-submit input').on('click', function (event) {
		event.preventDefault();

		if (Statnumbercard == 1 && Statmonth == 1 && Statyears == 1 && Statusername == 1 && Statusercode == 1) {

			var data = {
				numbercard: $('#input1').val() + $('#input2').val() + $('#input3').val() + $('#input3').val(),
				month: $("#month").val(),
				years: $("#years").val(),
				username: $("#username").val(),
				usercode: $("#usercode").val()
			};
			//выведет данные формы
			console.log(data);
			$.ajax({
				method: 'POST',
				url: '',
				data: data
			}).done(function (data) {
				if (data) {
					console.log(999999999);
				}
			});
		} else {
			if (Statnumbercard == 0) {
				$('#input1').addClass('error');
				$('#input2').addClass('error');
				$('#input3').addClass('error');
				$('#input4').addClass('error');
			}
			if (Statmonth == 0) {
				$('.form__input-month').addClass('error');
			}
			if (Statyears == 0) {
				$('.form__input-years').addClass('error');
			}
			if (Statusername == 0) {
				$('#username').addClass('error');
			}
			if (Statusercode == 0) {
				$('#usercode').addClass('error');
			}
		}
	});
};

$(document).ready(function () {
	Test.mobileMenu();
	Test.switchTab();
	Test.formValidation();
});
//# sourceMappingURL=app.js.map

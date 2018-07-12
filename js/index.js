$(function () {
    service = analytics.getService('my_app');
    service.getConfig().addCallback(function (config) {
        console.log(config.isTrackingPermitted());
        config.setTrackingPermitted(true);
    });

    tracker = service.getTracker('UA-108349832-1');
    tracker.sendEvent('app', 'use');

    $("#time_girl").show();
    $("#time_device").hide();
    $("#time_fairy").hide();

    var output = $("#time_output");
    var url = "https://www.ntw-20.com/";
    $(".navbar-nav li").each(
        function () {
            $(this).click(
                function () {
                    var time = [$("#time_girl"), $("#time_device"), $("#time_fairy")];
                    var data_index = [$(".navbar-nav li[data-index = 0 ]"), $(".navbar-nav li[data-index = 1 ]"), $(".navbar-nav li[data-index = 2 ]")];
                    output.html("");


                    for (var i = 0; i < 3; i++) {
                        time[i].hide();
                        data_index[i].removeClass("active");
                    }

                    data_index[$(this).attr("data-index")].addClass("active");
                    time[$(this).attr("data-index")].show();

                }
            );
        }
    );

    $("#time_fairy .input-group").submit(
        function () {
            tracker.sendEvent('app', 'search_fairy');
            var _this = this;

            var hh = $("#fairy_HH").val();
            var mm = $("#fairy_MM").val();
            if (hh === null || hh === "") {
                hh = 0;
            }

            if (mm === null || mm === "") {
                mm = 0;
            }

            $.getJSON(url + "api/inquiry/fairy/" + hh + "/" + mm, function ($data) {
                if ($data.status === "success") {
                    var outputHtml = "";
                    var dataList = [];

                    for (var listdata in $data.data) {
                        for (var star in $data.data[listdata]) {
                            var number = $data.data[listdata][star].no;
                            var name = $data.data[listdata][star].name;

                            outputHtml += "<img  src='" + url + "/common/fairy/fairy_" + number + ".jpg' alt='" + name + "' title='" + name + "'>";
                            dataList.push(number);
                        }

                    }

                    output.html(outputHtml);

                } else if ($data.status === "empty") {
                    output.html('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-info-sign"></span>找不到有關數據!! 請再試!!</div>');
                }
            }).fail(function () {
                output.html('<div class="alert alert-warning" role="alert"> <span class="glyphicon glyphicon-info-sign"></span>伺服器出現問題!! 請再試!!</div>');
            });

            return false;
        }
    );

    $("#time_device .input-group").submit(
        function () {
            tracker.sendEvent('app', 'search_device');
            var _this = this;

            var mm = $("#time_MM").val();

            if (mm === null || mm === "") {
                mm = 0;
            }

            $.getJSON(url + "/api/inquiry/device/" + mm, function ($data) {
                if ($data.status === "success") {
                    var outputHtml = "";
                    var dataList = [];

                    for (var listdata in $data.data) {

                        var data = $data.data[listdata];
                        var star = "";

                        for (var ii = 0; ii < data.star; ii++) {
                            star += "★";
                        }

                        outputHtml += '<div class="div_device"><ol><li class="' + data.img + ' str_' + data.star + '_bg">' + star + '</li><li class="str_' + data.star + '">' + data.name + '</li><li>' + data.type + '</li><li>' + data.attribute + '</li></ol></div>'
                        dataList.push(data);
                    }

                    output.html(outputHtml);

                } else if ($data.status === "empty") {
                    output.html('<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-info-sign"></span>找不到有關數據!! 請再試!!</div>');
                }
            }).fail(function () {
                output.html('<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign"></span>伺服器出現問題!! 請再試!!</div>');
            });

            return false;
        });


    $("#time_girl .input-group").submit(
        function () {
            tracker.sendEvent('app', 'search_girl');
            var _this = this;

            var hh = $("#girl_HH").val();
            var mm = $("#girl_MM").val();

            console.log(hh);
            console.log(mm);
            if (hh === null || hh === "") {
                hh = 0;
            }

            if (mm === null || mm === "") {
                mm = 0;
            }

            //this.$ga.event('time','search_girl');

            $.getJSON(url + "/api/inquiry/girl/" + hh + "/" + mm, function ($data) {
                if ($data.status === "success") {
                    var outputHtml = "";
                    var dataList = [];

                    for (var listdata in $data.data) {
                        for (var star in $data.data[listdata]) {
                            var number = $data.data[listdata][star].no;
                            var name = $data.data[listdata][star].name;
                            if ($data.data[listdata][star].src != null) {
                                name = $data.data[listdata][star].src;
                            }

                            var className = "";
                            switch ($data.data[listdata][star].heavy) {
                                case "1":
                                    className = "is_heavy";
                                    break;
                                case "0":
                                    className = "no_heavy";
                                    break;
                            }
                            outputHtml += "<a href='https://zh.moegirl.org/zh-hant/少女前线:" + name + "' target='_blank'><img class='" + className + "' src='" + url + "/common/girl/girl_" + number + ".jpg' alt='" + name + "' title='" + name + "'></a>";
                            dataList.push(number);
                        }

                    }

                    output.html(outputHtml);

                } else if ($data.status === "empty") {
                    output.html('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-info-sign"></span>找不到有關數據!! 請再試!!</div>');
                }
            }).fail(function () {
                output.html('<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign"></span>伺服器出現問題!! 請再試!!</div>');
            });

            return false;
        });


    $(".other_function").click(function(){
        tracker.sendEvent('app', 'other_function');
        window.open("https://www.ntw-20.com");
    });
});

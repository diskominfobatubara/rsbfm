
function alertToastr(message) {
    toastr.options =
        {
        "newestOnTop"   : true,
        "positionClass" : "toast-custom",
        "closeButton"   : true,
        "progressBar"   : true
        }
    toastr.success(message);
}

function alertDanger(message) {
    $("#alerts").html(
        '<div class="alert alert-danger alert-dismissible fade show ml-2 mr-2 mt-2">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            "&times;</button><strong>Success! </strong>" +
            message +
            "</div>"
    );
    $(window).scrollTop(0);
    setTimeout(function () {
        $(".alert").alert("close");
    }, 5000);
}


function DataTable(ajaxUrl, columns) {
    var table = $(".table").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        pageLength: 10,
        lengthMenu: [10, 50, 100, 200, 500],
        lengthChange: true,
        autoWidth: false,
        ajax: ajaxUrl,
        columns: columns,
    });

    return table;
}

function createModel(createHeading) {
    $("#create").click(function() {
        $("#saveBtn").val("create");
        $("#modelHeading").html(createHeading);
        $("#ajaxModel").modal("show"); 
        $("#delete").modal("show"); 
        $("#ajaxForm").trigger("reset");
    });
}

function editModel(editUrl, editHeading, field) {
    $("body").on("click", ".edit", function () {
        var editId = $(this).data("id");
        $.get(editUrl + "/" + editId + "/edit", function(data) {
            $("#saveBtn").val("edit");
            $("#ajaxModel").modal("show");
            $("#hidden_id").val(data.id);
            $("#modelHeading").html(editHeading);
            $.each(field, function(index, value) {
                $("#" + value).val(data[value]);
            });   
        });
    });
}

function saveBtn(urlStore, table) {
    $("#saveBtn").click(function(e) {
        e.preventDefault();
        $(this).html(
            "<span class='spinner-border spinner-border-sm'></span><span class='visually-hidden'><i> menyimpan...</i></span>"
        );
   
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: urlStore,
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data.errors) {
                    $('.alert-danger').html('');
                    $.each(data.errors, function(key, value) {
                        $('.alert-danger').show();
                        $('.alert-danger').append('<strong><li>' +
                            value +
                            '</li></strong>');
                        $(".alert-danger").fadeOut(5000);
                        $("#saveBtn").html("Simpan");
                    });
                } else {
                    table.draw();
                    alertToastr(data.success);
                    $("#saveBtn").html("Simpan");
                    $('#ajaxModel').modal('hide');
                }
            },
        });
    });
}

function Delete(fitur, editUrl, deleteUrl, table) {
    $("body").on("click", ".delete", function () {
        var deleteId = $(this).data("id");
        $("#modelHeadingHps").html("Hapus");
        $("#fitur").html(fitur);
        $("#ajaxModelHps").modal("show");
        $.get(editUrl + "/" + deleteId + "/edit", function(data) {
            $("#field").html(data.name);
        });
        $("#hapusBtn").click(function(e) {
            e.preventDefault();
            var csrfToken = $('meta[name="csrf-token"]').attr('content');
            
            $(this).html("<span class='spinner-border spinner-border-sm'></span><span class='visually-hidden'><i> menghapus...</i></span>");
            $.ajax({
                type: "DELETE",
                url: deleteUrl + "/" + deleteId,
                data: {
                    _token: csrfToken,
                },
                success: function(data) {
                    if (data.errors) {
                        $('.alert-danger').html('');
                        $.each(data.errors, function(key, value) {
                            $('.alert-danger').show();
                            $('.alert-danger').append('<strong><li>' + value + '</li></strong>');
                            $(".alert-danger").fadeOut(5000);
                            $("#hapusBtn").html("<i class='fa fa-trash'></i>Hapus");
                        });
                    } else {
                        if (table) {
                            table.draw();
                        }
                        alertToastr(data.success);
                        $("#hapusBtn").html("<i class='fa fa-trash'></i>Hapus");
                        $('#ajaxModelHps').modal('hide');
                    }
                },
            });
        }); 
    });
}

function getData(appendKosong, urlGet, selector, append) {
    $('#instansi_id').on('change', function() {
        var seletedId = this.value;
        appendKosong.empty();
        var csrfToken = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: urlGet,
            type: "POST",
            data: {
                idSeleted: seletedId,
                _token: csrfToken
            },
            dataType: 'json',
            success: function (result) {
                $(selector).html(append);
                $.each(result, function(key, value) {
                    $(selector).append('<option value="' +
                        value.id + '">' + value.name +
                        '</option>');
                });
            }
        });
    });
}




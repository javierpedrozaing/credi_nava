$(function() {
    $(document).on('keypress', 'input[name="num_doc"]', function(evt) {
        if (evt.which == 13) {
            var num = $('#num_doc').val().trim();
            var type = $('input[name=type_doc]:checked').val();

            if (type == 'factura') {

                printInvoiceLetter(num);
            } else if (type == 'recibo') {
                printInvoiceLetter(num);
            }
        }
    })
})
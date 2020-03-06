<!DOCTYPE html>
<html lang="es" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>PDF</title>
        <style media="screen">
            *,body{
                margin: 0;
                padding: 0;
                height: 100vh;
                height: 100vh;
            }
        </style>
    </head>
    <body>
        <?php $url = $_GET['url']; ?>
        <div class="" style="height: 100%; width: 100%;">
            <iframe src="<?= $url = $_GET['url']; ?>" width="100%" style="border: none;height: 100%;"></iframe>
        </div>
        <!-- <embed _ngcontent-gil-107=""
        id="embedPDF"
        style="height: 100%;"
        type="application/pdf"
        width="100%"
        src="<?= $url ?>" internalinstanceid="76"> -->
    </body>
</html>

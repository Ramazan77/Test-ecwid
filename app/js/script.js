var btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    var url = document.getElementById('gallery-input').value;
    fetch(url)
        .then((data) => data.json())
        .then((out) => {
            $.each(out.galleryImages, function (key, value) {
                $('#gallery-wrapper').append('<img src="' + value.url + '"/>');
            });
        });
});
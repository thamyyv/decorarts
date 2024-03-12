 // Função para exibir a página especificada
 function showPage(pageId) {
    var pages = document.querySelectorAll('.container');
    pages.forEach(function(page) {
        if (page.id === pageId) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    });
}

// Evento para lidar com o envio de imagem
document.getElementById('addImageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('imageInput');
    var files = fileInput.files;
    if (files.length > 0) {
        var image = files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageElement = document.createElement('img');
            imageElement.src = e.target.result;
            var gallery = document.querySelector('.image-grid');
            var item = document.createElement('div');
            item.classList.add('image-item');
            item.appendChild(imageElement);
            gallery.appendChild(item);
        }
        reader.readAsDataURL(image);
    }
});
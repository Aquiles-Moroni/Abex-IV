
        document.addEventListener('DOMContentLoaded', function() {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    console.log('A requisição foi enviada');
                    console.log('Checkbox ID:', checkbox.id, 'Checked:', checkbox.checked);
                });
            });
        });
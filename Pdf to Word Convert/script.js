const form = document.getElementById('pdf-form');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const fileInput = document.getElementById('pdf-file');
	const file = fileInput.files[0];

	if (file.type !== 'application/pdf') {
		alert('Please select a PDF file');
		return;
	}

	const formData = new FormData();
	formData.append('file', file);

	fetch('/convert', {
		method: 'POST',
		body: formData
	})
	.then(response => response.blob())
	.then(blob => {
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = file.name.replace('.pdf', '.docx');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	})
	.catch(error => {
		console.error(error);
		alert('An error occurred during conversion');
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const orderModal = document.querySelector(".js-order-modal");
	const modalTitle = orderModal.querySelector(".js-order-title");
	const headerLinks = Array.from(document.querySelectorAll(".js-header-link"));

	if (orderModal && modalTitle) {
		orderModal.addEventListener("show.bs.modal", (event) => {
			modalTitle.textContent = event.relatedTarget.dataset.title;
		})
	}

	if (headerLinks.length) {
		headerLinks.forEach(item => {
			item.addEventListener("click", (event) => {
				event.preventDefault();
				const href = event.target.getAttribute("href");
				const block = document.querySelector(href);
				if (block) {
					block.scrollIntoView({
						behavior: "smooth"
					})
				}
				if (window?.innerWidth < 768) {
					const headerToggle = document.querySelector(".js-header-toggle");
					if (headerToggle) {
						headerToggle.click();
					}
				}
			})
		})
	}
})

const focusIn = (field) => {
	const fieldBlock = document.querySelector(`.js-${field}-block`);
	const fieldInput = document.querySelector(`.js-${field}-input`);
	if (fieldBlock && fieldInput) {
		fieldBlock.classList.add("modal__block--focused");
		fieldInput.focus();
	}
};

const focusOut = (field) => {
	const fieldBlock = document.querySelector(`.js-${field}-block`);
	const fieldInput = document.querySelector(`.js-${field}-input`);
	if (fieldBlock && fieldInput) {
		const value = fieldInput.value;
		value ? fieldBlock.classList.add("modal__block--filled") : fieldBlock.classList.remove("modal__block--filled");
		fieldInput.blur();
		fieldBlock.classList.remove("modal__block--focused");
	}
};

const submitForm = (event) => {
	event.preventDefault();

	const form = document.querySelector(".js-modal-form");
	const nameInput = form.querySelector(".js-name-input");
	const phoneInput = form.querySelector(".js-phone-input");
	const emailInput = form.querySelector(".js-email-input");
	const companyInput = form.querySelector(".js-company-input");
	const agreement = form.querySelector(".js-agreement-input");

	if (!nameInput.value) {
		focusIn("name");
		return;
	}

	if (!phoneInput.value) {
		focusIn("phone");
		return;
	}

	if (!emailInput.value) {
		focusIn("email");
		return;
	}

	if (!companyInput.value) {
		focusIn("company");
		return;
	}

	if (!agreement.checked) {
		const agreementError = document.querySelector(".js-agreement-error");
		if (agreementError) {
			agreementError.classList.add("modal__error--visible");
		}
		return;
	}

	form.submit();
};
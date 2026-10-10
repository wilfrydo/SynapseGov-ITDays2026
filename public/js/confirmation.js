(() => {
    const dialog = document.getElementById('actionConfirmation');
    if (!dialog) return;

    const title = dialog.querySelector('#actionConfirmationTitle');
    const message = dialog.querySelector('#actionConfirmationMessage');
    const accept = dialog.querySelector('[data-confirm-accept]');
    const icon = dialog.querySelector('.action-confirmation__icon i');
    const approved = new WeakSet();
    const pending = new WeakSet();
    let resolveConfirmation;

    const ask = (options) => new Promise(resolve => {
        if (dialog.open || resolveConfirmation) { resolve(false); return; }
        title.textContent = options.confirmTitle || 'Lanjutkan tindakan?';
        message.textContent = options.confirm;
        accept.textContent = options.confirmLabel || 'Ya, lanjutkan';
        dialog.dataset.tone = options.confirmTone || 'success';
        icon.className = options.confirmTone === 'danger' ? 'fas fa-triangle-exclamation' : 'fas fa-circle-check';
        resolveConfirmation = resolve;
        dialog.returnValue = 'cancel';
        document.body.classList.add('confirmation-open');
        dialog.showModal();
    });

    dialog.querySelectorAll('[data-confirm-cancel]').forEach(button => {
        button.addEventListener('click', () => dialog.close('cancel'));
    });
    accept.addEventListener('click', () => dialog.close('accept'));
    dialog.addEventListener('close', () => {
        document.body.classList.remove('confirmation-open');
        const resolve = resolveConfirmation;
        resolveConfirmation = null;
        resolve?.(dialog.returnValue === 'accept');
    });
    dialog.addEventListener('click', event => {
        const rect = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
            dialog.close('cancel');
        }
    });

    // Keep browser validation, CSRF fields and the original submit button intact.
    document.addEventListener('submit', async event => {
        const form = event.target;
        const submitter = event.submitter;
        const options = submitter?.hasAttribute('data-confirm') ? submitter.dataset : form.dataset;
        if (!options.confirm) return;
        if (approved.has(form)) { approved.delete(form); return; }
        event.preventDefault();
        if (pending.has(form)) return;
        pending.add(form);
        const confirmed = await ask(options);
        pending.delete(form);
        if (confirmed && form.isConnected && (!submitter || submitter.isConnected)) {
            approved.add(form);
            form.requestSubmit(submitter || undefined);
            approved.delete(form);
        }
    });
})();

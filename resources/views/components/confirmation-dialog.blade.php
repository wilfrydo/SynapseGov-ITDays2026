<dialog id="actionConfirmation" class="action-confirmation" aria-labelledby="actionConfirmationTitle" aria-describedby="actionConfirmationMessage">
    <div class="action-confirmation__body">
        <button type="button" class="action-confirmation__close" data-confirm-cancel aria-label="Tutup konfirmasi">
            <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <div class="action-confirmation__icon" aria-hidden="true"><i class="fas fa-circle-check"></i></div>
        <p class="action-confirmation__eyebrow">Konfirmasi tindakan</p>
        <h2 id="actionConfirmationTitle">Lanjutkan tindakan?</h2>
        <p id="actionConfirmationMessage" class="action-confirmation__message"></p>
    </div>
    <div class="action-confirmation__footer">
        <button type="button" class="action-confirmation__button action-confirmation__cancel" data-confirm-cancel autofocus>Batal</button>
        <button type="button" class="action-confirmation__button action-confirmation__accept" data-confirm-accept>Ya, lanjutkan</button>
    </div>
</dialog>

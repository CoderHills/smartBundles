// State
let selectedBundle = null;

// DOM Elements
const bundleOptions = document.querySelectorAll('.bundle-option');
const phoneInput = document.getElementById('phone');
const paymentSection = document.getElementById('paymentSection');
const amountDisplay = document.querySelector('.amount-display');
const transactionCodeInput = document.getElementById('transactionCode');
const submitBtn = document.getElementById('submitBtn');
const confirmation = document.getElementById('confirmation');

// Till number (static - you can change this)
const TILL_NUMBER = '4222720';

// Bundle Selection
bundleOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected from all
        bundleOptions.forEach(opt => opt.classList.remove('selected'));
        // Add selected to clicked
        option.classList.add('selected');
        // Store selected bundle data
        selectedBundle = {
            size: option.dataset.size,
            price: parseInt(option.dataset.price),
            desc: option.dataset.desc || ''
        };
        // Show payment section
        paymentSection.style.display = 'block';
        // Update amount
        amountDisplay.textContent = `KES ${selectedBundle.price}`;
        // Scroll to payment section
        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// Form Submission
submitBtn.addEventListener('click', () => {
    // Validation
    if (!selectedBundle) {
        alert('Please select a bundle');
        return;
    }

    const phone = phoneInput.value.trim();
    if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
    }

    const transactionCode = transactionCodeInput.value.trim();
    if (!transactionCode) {
        alert('Please enter the M-Pesa transaction code');
        return;
    }

    // Show confirmation
    confirmation.style.display = 'block';
    // Hide form elements to prevent further interaction
    document.querySelector('.bundle-section').style.display = 'none';
    document.querySelector('.phone-section').style.display = 'none';
    paymentSection.style.display = 'none';
    document.querySelector('.transaction-section').style.display = 'none';
    submitBtn.style.display = 'none';

    // Log for backend (in real app, would send to server)
    console.log('Order submitted:', {
        bundle: selectedBundle,
        phone: phone,
        transactionCode: transactionCode,
        tillNumber: TILL_NUMBER
    });
});

// Initialize till number
document.querySelector('.till-number').textContent = TILL_NUMBER;

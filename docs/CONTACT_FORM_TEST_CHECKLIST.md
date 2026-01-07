# 📧 CONTACT FORM TESTING CHECKLIST

**Test URL:** https://ai.rastudio.se/contact

## Pre-Test Setup:
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab
- [ ] Clear any existing errors

## Test 1: Validation
- [ ] Try submitting empty form → Should show validation errors
- [ ] Enter invalid email → Should show "Invalid email"
- [ ] Enter valid data → Should proceed

## Test 2: Successful Submission (All 4 Languages)

### English:
- [ ] Fill form completely
- [ ] Click "Send Message"
- [ ] See success toast: "Message sent!"
- [ ] Form should reset
- [ ] Thank you message appears

### Swedish:
- [ ] Switch to Swedish (language switcher)
- [ ] Submit form
- [ ] Verify Swedish success message

### Dutch:
- [ ] Switch to Dutch
- [ ] Submit form
- [ ] Verify Dutch success message

### Italian:
- [ ] Switch to Italian
- [ ] Submit form
- [ ] Verify Italian success message

## Test 3: Check Data Received
- [ ] Check your email/FlexSubmit dashboard
- [ ] Verify you received all test submissions
- [ ] Check all fields are captured correctly

## Test 4: Error Handling
- [ ] Disconnect internet
- [ ] Try submitting → Should show error toast
- [ ] Reconnect
- [ ] Retry → Should work

## Test 5: Mobile Testing
- [ ] Open on mobile device
- [ ] Test form submission
- [ ] Verify responsive design
- [ ] Check keyboard behavior

## ✅ All Tests Passed?
Your contact form is fully functional!
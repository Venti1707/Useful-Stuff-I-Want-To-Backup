javascript: (async () => {
    const redeemPage = "https://redeem.tcg.pokemon.com/en-us/";

    if (window.location.href !== redeemPage) {
        console.error(`Please run this bookmarklet on the TCG Redeem page: ${redeemPage}`);
        return;
    }

    const REGEX = /^[A-Z0-9]{3}.*[A-Z0-9]{4}.*[A-Z0-9]{3}.*[A-Z0-9]{3}$/;
    const clipboard = await navigator.clipboard.readText();
    const input = clipboard
        .split(/\r?\n/)
        .map(code =>
            code
                .trim()
                .toUpperCase()
        )
        .filter(Boolean);

    const codes = input.filter(code =>
        code.length >= 12
        &&
        code.length <= 16
        &&
        REGEX.test(code)
    );

    const uniqueCodes = [...new Set(codes)];

    if (uniqueCodes.length === 0) {
        console.error("Clipboard is empty");
        return;
    }

    const inputFieldSelector = '._typeText_1h9p4_1.undefined';
    const submitButtonSelector = '._blueButton_2fvxv_1._verifySubmitButton_14nmk_77';
    const redeemButtonSelector = '._blueButton_2fvxv_1.undefined';
    const clearButtonSelector = '._redButton_2fvxv_1._clearTableButton_oelca_33';

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function waitForEmptyInput() {
        const inputField = document.querySelector(inputFieldSelector);
        if (!inputField) {
            console.error("Input field not found");
        }

        const start = Date.now();

        while (inputField.value.trim() !== "") {
            if (Date.now() - start > 30000) {
                console.error("Timed out waiting for input to clear");
            }
            await sleep(100);
        }
    }

    async function submitCode(code) {
        const inputField = document.querySelector(inputFieldSelector);
        const submitButton = document.querySelector(submitButtonSelector);

        if (!inputField || !submitButton) {
            console.error("Input field or submit button not found");
        }

        await waitForEmptyInput();

        const valueSetter = Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(inputField),
            "value"
        ).set;

        valueSetter.call(inputField, code);
        inputField.dispatchEvent(new Event("input", { bubbles: true }));
        inputField.dispatchEvent(new Event("change", { bubbles: true }));

        submitButton.click();

        await waitForEmptyInput();
    }

    try {
        console.log(`Total submissions: ${uniqueCodes.length}`);

        let batchCount = 0;

        for (let i = 0; i < uniqueCodes.length; i++) {
            console.log(`Redeeming ${i + 1}/${uniqueCodes.length}: ${uniqueCodes[i]}`);

            await submitCode(uniqueCodes[i]);
            batchCount++;

            if (batchCount === 10) {
                const redeemButton = document.querySelector(redeemButtonSelector);
                const clearButton = document.querySelector(clearButtonSelector);

                if (redeemButton && clearButton) {
                    console.log("Redeeming batch of 10");
                    redeemButton.click();
                    await sleep(3000);
                    clearButton.click();
                    await sleep(1500);
                }

                batchCount = 0;
            }
        }

        if (batchCount > 0) {
            const redeemButton = document.querySelector(redeemButtonSelector);
            const clearButton = document.querySelector(clearButtonSelector);

            if (redeemButton && clearButton) {
                console.log(`Redeeming batch of ${batchCount}`);
                redeemButton.click();
                await sleep(3000);
                clearButton.click();
            }
        }

        console.log(`All ${uniqueCodes.length} codes redeemed`);
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
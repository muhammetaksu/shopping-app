export const optionForLoop = (number) => {
    let arr = [];

    for (let i = 1; i <= number; i++) {
        arr.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    return arr;
};

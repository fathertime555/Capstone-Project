function a() {
    var t;
    return {
        sett: (a) => {
            t = a;
        },
        gett: () => {
            if (typeof t === 'function')
                return t();
        }
    }
}
export default a;
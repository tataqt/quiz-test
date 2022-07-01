export function getRecomandationIds(dataResult) {
    const selectedTest = Object.keys(dataResult)[1];
    let filtered;

    switch (selectedTest) {
        case '1': // Иммунитет
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 1 ? '19223,18803,13418,18802,14538,14562,15873' : '16084'
        case '2': // Опорно-двигательный аппарат
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '9151,16627,19223,18803,7746,18088' : '16084'
        case '3': // Женское здоровье
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '18806,20848,7773,18802,14562,18803,9207,13242' : '16084'
        case '4': // Кожа/ногти/волосы
            filtered = dataResult[selectedTest][4].columns[0].selected;
            return filtered ? '21254,18088,15874,19223,14562,18803,14562,18802,7773,14538' : '21254,18088,15874,19223,14562,18803,14562,18802,7773'
        case '5': // Пищеварение
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '13418,17909,14538,9207,16164' : '16084'
        case '6': // Похудение TODO расчет массы тела
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            // return filtered.length > 0 ? '14503,21603,21137,15873,13418,7695,14562,7773,14544' : '16084'
            return '14503,21603,21137,15873,13418,7695,14562,7773,14544'
        case '7': // Память, внимание, эмоции
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '20848,21254,14562,16627,16164,14538,19762' : '16084'
        case '8': // Здоровье сердца и сосудов
            filtered = dataResult[selectedTest][0].columns[0].selected;
            return filtered.length > 0 ? '7773,15507,14538,14562,15874,17909,19762' : '16084'
        case '9': // Планирование беременности
            filtered = dataResult[selectedTest].filter((question) => !question.columns[2].selected);
            return filtered.length > 0 ? '16164,14562,20848,13242,9207' : '16084'
        case '10': // Зрение
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 && (dataResult[0][1].columns[2].selected || dataResult[0][1].columns[3].selected) ? '15507,17909,19762' : '16084'
        case '11': // Здоровье щитовидной железы
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '21254,14562,19762,18806' : '16084'
        case '12': // Герпетическая инфекция
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '18809,17909,22060,18802' : '16084'
        case '13': // Мужское здоровье
            return '18802,9207,7695,7741,16164,14562,20848,13242'
        case '14': // Обмен веществ
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '19762,14562,21137,17909,14544,14538' : '16084'
        case '15': // TODO Нет теста для Поддержка организма в зрелом возрасте
            filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
            return filtered.length > 0 ? '21254' : '16084'
        default:
            return '0';
    }
}
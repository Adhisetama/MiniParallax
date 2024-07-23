class MiniParallax
{
    constructor() {
        this.windowH = window.innerHeight;
        this.windowW = window.innerWidth;

        this.functions = [];
        window.addEventListener('scroll', e => {
            for (const f of this.functions) { f(window.scrollY) }
        })
    }

    /**
     * add listener for parallax by range of window.scrollY
     * with scroll rate defined by range of i
     * 
     * @param {object} range defines range of scroll and value
     * @param {number[2]} range.y defines range of window.scrollY as [from, to]
     * @param {number[2]} range.ranges defines range of i's converted from y as [from, to]
     * @param {callback} callback what happens on range of i[0] to i[1]
     */
    add(range, callback) {
        // if scrollY in page, then convert scrollY to i and execute callback
        // i = minI + (y - minY) * ( (maxI-minI) / (maxY-minY) )
        // i = minI + (y - minY) * ratio
        const [ minY, maxY ] = range.y
        if (range.i !== undefined) {
            const [ minI, maxI ] = range.i
            const ratio = (maxI-minI) / (maxY-minY)
            let snap = MiniParallax.INITIAL_SNAP

            this.functions.push(scrollY => {
                if (minY >= scrollY && snap !== MiniParallax.BEFORE_RANGE) {
                    snap = MiniParallax.BEFORE_RANGE
                    callback(minI)
                } else if (minY < scrollY && scrollY <= maxY ) {
                    if (snap !== MiniParallax.IN_RANGE) snap = MiniParallax.IN_RANGE
                    callback(Math.round(minI + (scrollY - minY) * ratio))
                } else if (scrollY > maxY && snap !== MiniParallax.AFTER_RANGE) {
                    snap = MiniParallax.AFTER_RANGE
                    callback(maxI)
                }
            })
        } else {
            const ratios = range.ranges.map(r => (r[1]-r[0])/(maxY-minY))
            const minI = range.ranges.map(r => r[0])
            const maxI = range.ranges.map(r => r[1])
            let snap = MiniParallax.INITIAL_SNAP

            this.functions.push(scrollY => {
                if (minY >= scrollY && snap !== MiniParallax.BEFORE_RANGE) {
                    snap = MiniParallax.BEFORE_RANGE
                    callback(...minI)
                } else if (minY < scrollY && scrollY <= maxY ) {
                    const dy = scrollY - minY
                    callback(...range.ranges.map((r, i) => (
                        Math.round(
                            r[0] + dy*ratios[i]
                        )
                    )))
                } else if (scrollY > maxY && snap !== MiniParallax.AFTER_RANGE) {
                    snap = MiniParallax.AFTER_RANGE
                    callback(maxI)
                }
            })
        }
    }

    static INITIAL_SNAP = -1
    static BEFORE_RANGE = 1
    static IN_RANGE = 2
    static AFTER_RANGE = 3

    
}
/**
 * Performance Utility Tests
 */

describe('Performance Utility', () => {
    let Performance;

    beforeAll(() => {
        require('../assets/js/utils/performance.js');
        Performance = window.AI_GEO.Performance;
    });

    describe('debounce', () => {
        jest.useFakeTimers();

        test('should delay function execution', () => {
            const func = jest.fn();
            const debounced = Performance.debounce(func, 300);

            debounced();
            expect(func).not.toHaveBeenCalled();

            jest.advanceTimersByTime(300);
            expect(func).toHaveBeenCalledTimes(1);
        });

        test('should cancel previous calls', () => {
            const func = jest.fn();
            const debounced = Performance.debounce(func, 300);

            debounced();
            debounced();
            debounced();

            jest.advanceTimersByTime(300);
            expect(func).toHaveBeenCalledTimes(1);
        });
    });

    describe('throttle', () => {
        jest.useFakeTimers();

        test('should limit function calls', () => {
            const func = jest.fn();
            const throttled = Performance.throttle(func, 300);

            throttled();
            throttled();
            throttled();

            expect(func).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(300);
            throttled();

            expect(func).toHaveBeenCalledTimes(2);
        });
    });
});

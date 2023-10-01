#include <stdbool.h>
#include <stdio.h>
int main(char const *argv[])
{
    int n;
    printf("Type N, from 0 to 8\n");
    scanf("%d", &n);
    float num[] = {1, 3, 64, 90.45, 19.6, 44530.78, 134, 13031.86, 3133.97};
    return printf("Corresponding number %.2f", num["[%d]", n]);
}
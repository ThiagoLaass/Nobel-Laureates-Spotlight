#include<stdio.h>
#include<string.h>


int main()
{
    char nome[50], cidade[50], pais[10];

    printf("\nInforme seu nome: ");
    gets(nome);
    printf("\nInforme sua cidade: ");
    gets(cidade);
    printf("\nInforme seu pais: ");
    gets(pais);

    printf("\nNome informado: "); puts(nome);
    printf("\nCidade informada: "); puts(cidade);
    printf("\nPais informado: "); puts(pais);

return 0;
}

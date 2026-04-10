# O projeto
As páginas são escritas no formato [Markdown], e para renderizar utilizamos o [Mkdocs](http://www.mkdocs.org).

## Boas práticas
- Verifique se há links quebrados
- Evite alterar endereços: eles podem ser referenciados em outras fontes

### Mas se ainda precisar alterar.. 
https://github.com/dkhamsing/awesome_bot

```sh
gem install awesome_bot
find docs -name '*.md' -exec grep -l http {} + | xargs awesome_bot -t 10 --allow-dupe --allow-ssl --allow-redirect --base-url http://127.0.0.1:8000 --skip-save-results
```

## Rodando localmente
* clone o repositório

```bash
  $ git clone https://github.com/benlankheet/portifolio.git
```

* dentro da pasta `portfolio`, execute os comandos abaixo (Python 3.x necessário):

```bash
  $ python3 -m venv .venv
  $ source .venv/bin/activate
  $ .venv\Scripts\activate  # Para Windows
  $ pip install -r requirements.txt
  $ mkdocs serve  
  # Acesse http://127.0.0.1:8000 no navegador
```

* O site rodará por padrão em http://127.0.0.1:8000
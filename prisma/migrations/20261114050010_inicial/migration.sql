-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('ADMIN', 'VETERINARIO', 'RECEPCAO', 'FINANCEIRO', 'ESTOQUE', 'BANHO_TOSA');

-- CreateEnum
CREATE TYPE "TipoSala" AS ENUM ('CONSULTORIO', 'CIRURGIA', 'IMAGEM', 'BANHO_TOSA', 'INTERNACAO', 'HOTEL');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'FEMEA', 'INDEFINIDO');

-- CreateEnum
CREATE TYPE "GravidadeAlergia" AS ENUM ('LEVE', 'MODERADA', 'GRAVE');

-- CreateEnum
CREATE TYPE "TipoConsentimento" AS ENUM ('TRATAMENTO_DADOS', 'COMUNICACAO_WHATSAPP', 'COMUNICACAO_EMAIL', 'MARKETING');

-- CreateEnum
CREATE TYPE "TipoPedidoLgpd" AS ENUM ('EXPORTACAO', 'EXCLUSAO', 'CORRECAO');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('ABERTO', 'CONCLUIDO', 'RECUSADO');

-- CreateEnum
CREATE TYPE "CategoriaServico" AS ENUM ('CONSULTA', 'VACINA', 'EXAME', 'CIRURGIA', 'ESTETICA', 'HOSPEDAGEM', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('AGENDADO', 'CONFIRMADO', 'CHECKIN', 'EM_ATENDIMENTO', 'CONCLUIDO', 'FALTOU', 'CANCELADO');

-- CreateEnum
CREATE TYPE "OrigemAgendamento" AS ENUM ('SITE', 'PORTAL', 'RECEPCAO', 'TELEFONE');

-- CreateEnum
CREATE TYPE "StatusFila" AS ENUM ('AGUARDANDO', 'ENCAIXADO', 'DESISTIU');

-- CreateEnum
CREATE TYPE "RespostaConfirmacao" AS ENUM ('CONFIRMOU', 'CANCELOU');

-- CreateEnum
CREATE TYPE "TipoAtendimento" AS ENUM ('CONSULTA', 'RETORNO', 'VACINA', 'EMERGENCIA', 'CIRURGIA', 'INTERNACAO', 'EXAME');

-- CreateEnum
CREATE TYPE "StatusAtendimento" AS ENUM ('ABERTO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "TipoRegistro" AS ENUM ('ANAMNESE', 'EXAME_FISICO', 'DIAGNOSTICO', 'EVOLUCAO', 'CONDUTA', 'OBSERVACAO');

-- CreateEnum
CREATE TYPE "TipoReceita" AS ENUM ('SIMPLES', 'CONTROLE_ESPECIAL');

-- CreateEnum
CREATE TYPE "TipoProtocolo" AS ENUM ('VACINA', 'VERMIFUGO', 'ANTIPARASITARIO');

-- CreateEnum
CREATE TYPE "CategoriaExame" AS ENUM ('LABORATORIAL', 'IMAGEM', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusExame" AS ENUM ('SOLICITADO', 'COLETADO', 'EM_ANALISE', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusCirurgia" AS ENUM ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "PorteBaia" AS ENUM ('P', 'M', 'G');

-- CreateEnum
CREATE TYPE "TipoBaia" AS ENUM ('COMUM', 'ISOLAMENTO', 'UTI', 'HOTEL');

-- CreateEnum
CREATE TYPE "StatusInternacao" AS ENUM ('ATIVA', 'ALTA', 'OBITO');

-- CreateEnum
CREATE TYPE "StatusAdministracao" AS ENUM ('PENDENTE', 'FEITO', 'NAO_FEITO');

-- CreateEnum
CREATE TYPE "TipoHospedagem" AS ENUM ('HOTEL', 'CRECHE');

-- CreateEnum
CREATE TYPE "StatusHospedagem" AS ENUM ('RESERVADA', 'HOSPEDADO', 'ENCERRADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoProduto" AS ENUM ('MEDICAMENTO', 'VACINA', 'INSUMO', 'PRODUTO_LOJA', 'RACAO');

-- CreateEnum
CREATE TYPE "TipoMovimento" AS ENUM ('ENTRADA_COMPRA', 'SAIDA_VENDA', 'SAIDA_ATENDIMENTO', 'AJUSTE', 'PERDA', 'VENCIDO', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "StatusCompra" AS ENUM ('RASCUNHO', 'RECEBIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusOrcamento" AS ENUM ('ABERTO', 'APROVADO', 'RECUSADO', 'EXPIRADO', 'CONVERTIDO');

-- CreateEnum
CREATE TYPE "StatusVenda" AS ENUM ('ABERTA', 'PARCIAL', 'PAGA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO_DEBITO', 'CARTAO_CREDITO', 'BOLETO', 'CREDITO_PLANO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'ESTORNADO');

-- CreateEnum
CREATE TYPE "TipoMovimentoCaixa" AS ENUM ('SUPRIMENTO', 'SANGRIA', 'RECEBIMENTO', 'TROCO', 'ESTORNO');

-- CreateEnum
CREATE TYPE "TipoCategoria" AS ENUM ('RECEITA', 'DESPESA');

-- CreateEnum
CREATE TYPE "GrupoDre" AS ENUM ('RECEITA_SERVICOS', 'RECEITA_PRODUTOS', 'RECEITA_PLANOS', 'CUSTO_MERCADORIA', 'DESPESA_PESSOAL', 'DESPESA_OPERACIONAL', 'IMPOSTOS', 'OUTROS');

-- CreateEnum
CREATE TYPE "TipoLancamento" AS ENUM ('PAGAR', 'RECEBER');

-- CreateEnum
CREATE TYPE "StatusLancamento" AS ENUM ('ABERTO', 'PAGO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoNota" AS ENUM ('NFSE', 'NFCE');

-- CreateEnum
CREATE TYPE "StatusNota" AS ENUM ('PENDENTE', 'AGUARDANDO_CONFIGURACAO', 'EMITIDA', 'ERRO', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusContrato" AS ENUM ('ATIVO', 'SUSPENSO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusCobranca" AS ENUM ('ABERTA', 'PAGA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Canal" AS ENUM ('WHATSAPP', 'EMAIL');

-- CreateEnum
CREATE TYPE "TipoLembrete" AS ENUM ('CONSULTA', 'CONFIRMACAO', 'VACINA', 'RETORNO', 'ANIVERSARIO', 'BOLETIM');

-- CreateEnum
CREATE TYPE "StatusMensagem" AS ENUM ('PENDENTE', 'AGUARDANDO_CONFIGURACAO', 'ENVIADA', 'ENTREGUE', 'ERRO', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusCampanha" AS ENUM ('RASCUNHO', 'AGENDADA', 'ENVIANDO', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('TERMO', 'RECEITA', 'ATESTADO', 'BOLETIM');

-- CreateTable
CREATE TABLE "Clinica" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "razaoSocial" TEXT,
    "cnpj" TEXT,
    "telefone" TEXT,
    "whatsappPlantao" TEXT,
    "email" TEXT,
    "site" TEXT,
    "slogan" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" TEXT NOT NULL,
    "clinicaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "telefone" TEXT,
    "whatsapp" TEXT,
    "horarios" JSONB NOT NULL,
    "plantao24h" BOOLEAN NOT NULL DEFAULT false,
    "ativa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "tipo" "TipoSala" NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "telefone" TEXT,
    "crmv" TEXT,
    "especialidades" TEXT[],
    "bio" TEXT,
    "fotoUrl" TEXT,
    "slug" TEXT,
    "exibirNoSite" BOOLEAN NOT NULL DEFAULT false,
    "corAgenda" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilUsuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL,

    CONSTRAINT "PerfilUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioUnidade" (
    "usuarioId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,

    CONSTRAINT "UsuarioUnidade_pkey" PRIMARY KEY ("usuarioId","unidadeId")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "usuarioId" TEXT,
    "contaPortalId" TEXT,
    "doisFatoresOk" BOOLEAN NOT NULL DEFAULT false,
    "ip" TEXT,
    "userAgent" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiraEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoisFatores" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "segredoCifrado" TEXT NOT NULL,
    "ativadoEm" TIMESTAMP(3),
    "codigosRecuperacao" TEXT[],

    CONSTRAINT "DoisFatores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAuditoria" (
    "id" BIGSERIAL NOT NULL,
    "usuarioId" TEXT,
    "unidadeId" TEXT,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidadeId" TEXT,
    "antes" JSONB,
    "depois" JSONB,
    "ip" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAuditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "whatsapp" TEXT,
    "endereco" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "nascimento" DATE,
    "observacoes" TEXT,
    "aceitaWhatsapp" BOOLEAN NOT NULL DEFAULT true,
    "aceitaEmail" BOOLEAN NOT NULL DEFAULT true,
    "anonimizadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContaPortal" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT,
    "verificadoEm" TIMESTAMP(3),
    "ultimoAcesso" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContaPortal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especie" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Especie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raca" (
    "id" TEXT NOT NULL,
    "especieId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Raca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especieId" TEXT NOT NULL,
    "racaId" TEXT,
    "sexo" "Sexo" NOT NULL DEFAULT 'INDEFINIDO',
    "castrado" BOOLEAN,
    "nascimento" DATE,
    "pelagem" TEXT,
    "microchip" TEXT,
    "fotoUrl" TEXT,
    "observacoes" TEXT,
    "obitoEm" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAlergia" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "substancia" TEXT NOT NULL,
    "gravidade" "GravidadeAlergia" NOT NULL DEFAULT 'MODERADA',
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetAlergia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PesoRegistro" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "pesoGramas" INTEGER NOT NULL,
    "medidoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT,

    CONSTRAINT "PesoRegistro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consentimento" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "tipo" "TipoConsentimento" NOT NULL,
    "concedido" BOOLEAN NOT NULL,
    "versaoTexto" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "ip" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consentimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoLgpd" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "tipo" "TipoPedidoLgpd" NOT NULL,
    "status" "StatusPedido" NOT NULL DEFAULT 'ABERTO',
    "observacao" TEXT,
    "arquivoUrl" TEXT,
    "solicitadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidoEm" TIMESTAMP(3),

    CONSTRAINT "PedidoLgpd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoria" "CategoriaServico" NOT NULL,
    "descricao" TEXT,
    "descricaoLonga" TEXT,
    "duracaoMin" INTEGER NOT NULL,
    "precoCentavos" INTEGER NOT NULL,
    "tipoSala" "TipoSala",
    "agendavelOnline" BOOLEAN NOT NULL DEFAULT true,
    "exibirNoSite" BOOLEAN NOT NULL DEFAULT true,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfissionalServico" (
    "usuarioId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,

    CONSTRAINT "ProfissionalServico_pkey" PRIMARY KEY ("usuarioId","servicoId")
);

-- CreateTable
CREATE TABLE "HorarioTrabalho" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "inicioMin" INTEGER NOT NULL,
    "fimMin" INTEGER NOT NULL,

    CONSTRAINT "HorarioTrabalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bloqueio" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "salaId" TEXT,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT,

    CONSTRAINT "Bloqueio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "profissionalId" TEXT,
    "salaId" TEXT,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'AGENDADO',
    "encaixe" BOOLEAN NOT NULL DEFAULT false,
    "origem" "OrigemAgendamento" NOT NULL DEFAULT 'RECEPCAO',
    "observacoes" TEXT,
    "checkinEm" TIMESTAMP(3),
    "inicioAtendimentoEm" TIMESTAMP(3),
    "concluidoEm" TIMESTAMP(3),
    "canceladoEm" TIMESTAMP(3),
    "motivoCancelamento" TEXT,
    "criadoPorId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilaEspera" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "profissionalId" TEXT,
    "preferencia" TEXT,
    "de" TIMESTAMP(3),
    "ate" TIMESTAMP(3),
    "status" "StatusFila" NOT NULL DEFAULT 'AGUARDANDO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilaEspera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmacaoPresenca" (
    "id" TEXT NOT NULL,
    "agendamentoId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "enviadoEm" TIMESTAMP(3),
    "respondidoEm" TIMESTAMP(3),
    "resposta" "RespostaConfirmacao",

    CONSTRAINT "ConfirmacaoPresenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "agendamentoId" TEXT,
    "veterinarioId" TEXT NOT NULL,
    "tipo" "TipoAtendimento" NOT NULL,
    "status" "StatusAtendimento" NOT NULL DEFAULT 'ABERTO',
    "pesoGramas" INTEGER,
    "iniciadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizadoEm" TIMESTAMP(3),

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroProntuario" (
    "id" TEXT NOT NULL,
    "atendimentoId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "tipo" "TipoRegistro" NOT NULL,
    "conteudo" JSONB NOT NULL,
    "texto" TEXT NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "substituiId" TEXT,
    "motivoRetificacao" TEXT,
    "hash" TEXT NOT NULL,
    "hashAnterior" TEXT,
    "assinadoEm" TIMESTAMP(3),
    "assinadoPorId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroProntuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeloProntuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoAtendimento" "TipoAtendimento" NOT NULL,
    "tipoRegistro" "TipoRegistro" NOT NULL,
    "estrutura" JSONB NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ModeloProntuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anexo" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "atendimentoId" TEXT,
    "registroId" TEXT,
    "exameResultadoId" TEXT,
    "nome" TEXT NOT NULL,
    "tipoMime" TEXT NOT NULL,
    "tamanhoBytes" INTEGER NOT NULL,
    "caminho" TEXT NOT NULL,
    "sha256" TEXT NOT NULL,
    "enviadoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anexo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    "hashDocumento" TEXT NOT NULL,
    "ip" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "atendimentoId" TEXT,
    "petId" TEXT NOT NULL,
    "veterinarioId" TEXT NOT NULL,
    "tipo" "TipoReceita" NOT NULL DEFAULT 'SIMPLES',
    "pesoGramas" INTEGER,
    "observacoes" TEXT,
    "hash" TEXT,
    "emitidaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceitaItem" (
    "id" TEXT NOT NULL,
    "receitaId" TEXT NOT NULL,
    "produtoId" TEXT,
    "medicamento" TEXT NOT NULL,
    "apresentacao" TEXT,
    "concentracao" TEXT,
    "doseMgKg" DECIMAL(10,3),
    "doseCalculada" TEXT,
    "via" TEXT,
    "frequencia" TEXT,
    "duracao" TEXT,
    "quantidade" TEXT,
    "instrucoes" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReceitaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProtocoloVacinal" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especieId" TEXT NOT NULL,
    "tipo" "TipoProtocolo" NOT NULL DEFAULT 'VACINA',
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ProtocoloVacinal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProtocoloDose" (
    "id" TEXT NOT NULL,
    "protocoloId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "idadeMinDias" INTEGER,
    "intervaloDias" INTEGER,
    "reforcoDias" INTEGER,

    CONSTRAINT "ProtocoloDose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplicacao" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "atendimentoId" TEXT,
    "protocoloId" TEXT,
    "tipo" "TipoProtocolo" NOT NULL DEFAULT 'VACINA',
    "nome" TEXT NOT NULL,
    "dose" TEXT,
    "loteId" TEXT,
    "loteCodigo" TEXT,
    "validade" DATE,
    "fabricante" TEXT,
    "aplicadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aplicadoPorId" TEXT NOT NULL,
    "proximaDoseEm" DATE,
    "lembreteEnviadoEm" TIMESTAMP(3),
    "observacoes" TEXT,

    CONSTRAINT "Aplicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExameTipo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" "CategoriaExame" NOT NULL,
    "precoCentavos" INTEGER NOT NULL,
    "prazoDias" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ExameTipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamePedido" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "atendimentoId" TEXT,
    "exameTipoId" TEXT NOT NULL,
    "solicitanteId" TEXT NOT NULL,
    "status" "StatusExame" NOT NULL DEFAULT 'SOLICITADO',
    "observacoes" TEXT,
    "solicitadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamePedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExameResultado" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "laudo" TEXT,
    "liberadoEm" TIMESTAMP(3),
    "liberadoPorId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExameResultado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cirurgia" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "agendamentoId" TEXT,
    "cirurgiaoId" TEXT NOT NULL,
    "anestesistaId" TEXT,
    "salaId" TEXT,
    "procedimento" TEXT NOT NULL,
    "status" "StatusCirurgia" NOT NULL DEFAULT 'AGENDADA',
    "riscoAsa" INTEGER,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "descricaoCirurgica" TEXT,
    "intercorrencias" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cirurgia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermoConsentimento" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "cirurgiaId" TEXT,
    "internacaoId" TEXT,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "assinadoEm" TIMESTAMP(3),
    "assinadoPorNome" TEXT,
    "assinadoDocumento" TEXT,
    "assinaturaImagem" TEXT,
    "ip" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TermoConsentimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaAnestesica" (
    "id" TEXT NOT NULL,
    "cirurgiaId" TEXT NOT NULL,
    "pesoGramas" INTEGER,
    "jejumHoras" INTEGER,
    "mpa" TEXT,
    "inducao" TEXT,
    "manutencao" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "FichaAnestesica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroAnestesico" (
    "id" TEXT NOT NULL,
    "fichaId" TEXT NOT NULL,
    "momento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fc" INTEGER,
    "fr" INTEGER,
    "spo2" INTEGER,
    "temperatura" DECIMAL(4,1),
    "pas" INTEGER,
    "observacao" TEXT,

    CONSTRAINT "RegistroAnestesico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosOperatorio" (
    "id" TEXT NOT NULL,
    "cirurgiaId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "retornoEm" TIMESTAMP(3),

    CONSTRAINT "PosOperatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baia" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "porte" "PorteBaia" NOT NULL DEFAULT 'M',
    "tipo" "TipoBaia" NOT NULL DEFAULT 'COMUM',
    "ativa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Baia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Internacao" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "baiaId" TEXT NOT NULL,
    "veterinarioId" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "status" "StatusInternacao" NOT NULL DEFAULT 'ATIVA',
    "entradaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "altaEm" TIMESTAMP(3),
    "observacoes" TEXT,

    CONSTRAINT "Internacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescricao" (
    "id" TEXT NOT NULL,
    "internacaoId" TEXT NOT NULL,
    "veterinarioId" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prescricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescricaoItem" (
    "id" TEXT NOT NULL,
    "prescricaoId" TEXT NOT NULL,
    "produtoId" TEXT,
    "descricao" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "via" TEXT,
    "intervaloHoras" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3),

    CONSTRAINT "PrescricaoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administracao" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "previstoPara" TIMESTAMP(3) NOT NULL,
    "status" "StatusAdministracao" NOT NULL DEFAULT 'PENDENTE',
    "realizadoEm" TIMESTAMP(3),
    "realizadoPorId" TEXT,
    "observacao" TEXT,

    CONSTRAINT "Administracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoletimDiario" (
    "id" TEXT NOT NULL,
    "internacaoId" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "estadoGeral" TEXT,
    "texto" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "enviadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoletimDiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacote" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "servicoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "validadeDias" INTEGER NOT NULL,
    "precoCentavos" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pacote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PacoteCredito" (
    "id" TEXT NOT NULL,
    "pacoteId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "petId" TEXT,
    "vendaItemId" TEXT,
    "total" INTEGER NOT NULL,
    "usados" INTEGER NOT NULL DEFAULT 0,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PacoteCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospedagem" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "tipo" "TipoHospedagem" NOT NULL,
    "baiaId" TEXT,
    "entradaPrevista" TIMESTAMP(3) NOT NULL,
    "saidaPrevista" TIMESTAMP(3) NOT NULL,
    "entradaEm" TIMESTAMP(3),
    "saidaEm" TIMESTAMP(3),
    "status" "StatusHospedagem" NOT NULL DEFAULT 'RESERVADA',
    "diariaCentavos" INTEGER NOT NULL,
    "alimentacao" TEXT,
    "medicacoes" TEXT,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospedagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaEntradaSaida" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "agendamentoId" TEXT,
    "hospedagemId" TEXT,
    "entradaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condicaoEntrada" TEXT,
    "pertences" TEXT,
    "observacoesEntrada" TEXT,
    "responsavelEntradaId" TEXT,
    "saidaEm" TIMESTAMP(3),
    "condicaoSaida" TEXT,
    "observacoesSaida" TEXT,
    "responsavelSaidaId" TEXT,

    CONSTRAINT "FichaEntradaSaida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sku" TEXT,
    "codigoBarras" TEXT,
    "tipo" "TipoProduto" NOT NULL,
    "unidadeMedida" TEXT NOT NULL DEFAULT 'un',
    "controlado" BOOLEAN NOT NULL DEFAULT false,
    "listaControle" TEXT,
    "principioAtivo" TEXT,
    "concentracaoMgPorMl" DECIMAL(10,3),
    "doseMgKgPadrao" DECIMAL(10,3),
    "precoVendaCentavos" INTEGER NOT NULL DEFAULT 0,
    "custoCentavos" INTEGER NOT NULL DEFAULT 0,
    "estoqueMinimo" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "vendavel" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "validade" DATE,
    "quantidade" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "custoCentavos" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentoEstoque" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "loteId" TEXT,
    "tipo" "TipoMovimento" NOT NULL,
    "quantidade" DECIMAL(12,3) NOT NULL,
    "custoCentavos" INTEGER,
    "atendimentoId" TEXT,
    "vendaItemId" TEXT,
    "compraItemId" TEXT,
    "usuarioId" TEXT,
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentoEstoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "contato" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "fornecedorId" TEXT NOT NULL,
    "numeroNota" TEXT,
    "status" "StatusCompra" NOT NULL DEFAULT 'RASCUNHO',
    "totalCentavos" INTEGER NOT NULL DEFAULT 0,
    "emitidaEm" TIMESTAMP(3),
    "recebidaEm" TIMESTAMP(3),
    "criadoPorId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompraItem" (
    "id" TEXT NOT NULL,
    "compraId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" DECIMAL(12,3) NOT NULL,
    "custoUnitarioCentavos" INTEGER NOT NULL,
    "loteCodigo" TEXT,
    "validade" DATE,

    CONSTRAINT "CompraItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroControlado" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "movimentoId" TEXT NOT NULL,
    "receitaId" TEXT,
    "petId" TEXT,
    "veterinarioId" TEXT,
    "quantidade" DECIMAL(12,3) NOT NULL,
    "saldoApos" DECIMAL(12,3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroControlado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "petId" TEXT,
    "status" "StatusOrcamento" NOT NULL DEFAULT 'ABERTO',
    "validoAte" DATE,
    "descontoCentavos" INTEGER NOT NULL DEFAULT 0,
    "totalCentavos" INTEGER NOT NULL DEFAULT 0,
    "observacoes" TEXT,
    "criadoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrcamentoItem" (
    "id" TEXT NOT NULL,
    "orcamentoId" TEXT NOT NULL,
    "servicoId" TEXT,
    "produtoId" TEXT,
    "descricao" TEXT NOT NULL,
    "quantidade" DECIMAL(12,3) NOT NULL,
    "precoUnitarioCentavos" INTEGER NOT NULL,
    "descontoCentavos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OrcamentoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "tutorId" TEXT,
    "petId" TEXT,
    "orcamentoId" TEXT,
    "atendimentoId" TEXT,
    "status" "StatusVenda" NOT NULL DEFAULT 'ABERTA',
    "subtotalCentavos" INTEGER NOT NULL DEFAULT 0,
    "descontoCentavos" INTEGER NOT NULL DEFAULT 0,
    "totalCentavos" INTEGER NOT NULL DEFAULT 0,
    "vendedorId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechadaEm" TIMESTAMP(3),

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendaItem" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "servicoId" TEXT,
    "produtoId" TEXT,
    "descricao" TEXT NOT NULL,
    "quantidade" DECIMAL(12,3) NOT NULL,
    "precoUnitarioCentavos" INTEGER NOT NULL,
    "descontoCentavos" INTEGER NOT NULL DEFAULT 0,
    "totalCentavos" INTEGER NOT NULL,
    "profissionalId" TEXT,
    "contratoId" TEXT,
    "cobertoCentavos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VendaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT,
    "cobrancaId" TEXT,
    "caixaId" TEXT,
    "forma" "FormaPagamento" NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "parcelas" INTEGER NOT NULL DEFAULT 1,
    "status" "StatusPagamento" NOT NULL DEFAULT 'CONFIRMADO',
    "provedor" TEXT,
    "provedorId" TEXT,
    "pagoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcela" (
    "id" TEXT NOT NULL,
    "pagamentoId" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "vencimento" DATE NOT NULL,
    "lancamentoId" TEXT,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caixa" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "operadorId" TEXT NOT NULL,
    "abertoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechadoEm" TIMESTAMP(3),
    "saldoInicialCentavos" INTEGER NOT NULL DEFAULT 0,
    "saldoInformadoCentavos" INTEGER,
    "diferencaCentavos" INTEGER,
    "observacoes" TEXT,

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentoCaixa" (
    "id" TEXT NOT NULL,
    "caixaId" TEXT NOT NULL,
    "tipo" "TipoMovimentoCaixa" NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "pagamentoId" TEXT,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentoCaixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaFinanceira" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoCategoria" NOT NULL,
    "grupoDre" "GrupoDre" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CategoriaFinanceira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "tipo" "TipoLancamento" NOT NULL,
    "categoriaId" TEXT,
    "descricao" TEXT NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "vencimento" DATE NOT NULL,
    "competencia" DATE,
    "status" "StatusLancamento" NOT NULL DEFAULT 'ABERTO',
    "pagoEm" TIMESTAMP(3),
    "valorPagoCentavos" INTEGER,
    "formaPagamento" "FormaPagamento",
    "tutorId" TEXT,
    "fornecedorId" TEXT,
    "vendaId" TEXT,
    "compraId" TEXT,
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lancamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegraComissao" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT,
    "servicoId" TEXT,
    "categoria" "CategoriaServico",
    "percentual" DECIMAL(5,2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RegraComissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comissao" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "vendaItemId" TEXT NOT NULL,
    "baseCentavos" INTEGER NOT NULL,
    "percentual" DECIMAL(5,2) NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "competencia" DATE NOT NULL,
    "pagaEm" TIMESTAMP(3),

    CONSTRAINT "Comissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "tipo" "TipoNota" NOT NULL,
    "status" "StatusNota" NOT NULL DEFAULT 'PENDENTE',
    "numero" TEXT,
    "chave" TEXT,
    "provedor" TEXT,
    "payload" JSONB,
    "resposta" JSONB,
    "pdfUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emitidaEm" TIMESTAMP(3),

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "mensalidadeCentavos" INTEGER NOT NULL,
    "carenciaDias" INTEGER NOT NULL DEFAULT 30,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoCobertura" (
    "id" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "servicoId" TEXT,
    "categoria" "CategoriaServico",
    "percentual" INTEGER NOT NULL DEFAULT 100,
    "limiteAnual" INTEGER,
    "carenciaDias" INTEGER,

    CONSTRAINT "PlanoCobertura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "status" "StatusContrato" NOT NULL DEFAULT 'ATIVO',
    "inicio" DATE NOT NULL,
    "fim" DATE,
    "diaVencimento" INTEGER NOT NULL DEFAULT 10,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cobranca" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,
    "competencia" DATE NOT NULL,
    "valorCentavos" INTEGER NOT NULL,
    "vencimento" DATE NOT NULL,
    "status" "StatusCobranca" NOT NULL DEFAULT 'ABERTA',
    "lancamentoId" TEXT,
    "provedorId" TEXT,
    "pagaEm" TIMESTAMP(3),

    CONSTRAINT "Cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeloMensagem" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "canal" "Canal" NOT NULL,
    "assunto" TEXT,
    "corpo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ModeloMensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegraLembrete" (
    "id" TEXT NOT NULL,
    "tipo" "TipoLembrete" NOT NULL,
    "canal" "Canal" NOT NULL,
    "antecedenciaHoras" INTEGER NOT NULL,
    "modeloId" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RegraLembrete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" TEXT NOT NULL,
    "canal" "Canal" NOT NULL,
    "tutorId" TEXT,
    "destino" TEXT NOT NULL,
    "assunto" TEXT,
    "corpo" TEXT NOT NULL,
    "status" "StatusMensagem" NOT NULL DEFAULT 'PENDENTE',
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "erro" TEXT,
    "provedorId" TEXT,
    "agendadaPara" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enviadaEm" TIMESTAMP(3),
    "agendamentoId" TEXT,
    "campanhaId" TEXT,
    "chaveUnica" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segmento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "filtros" JSONB NOT NULL,

    CONSTRAINT "Segmento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campanha" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "canal" "Canal" NOT NULL,
    "segmentoId" TEXT,
    "assunto" TEXT,
    "corpo" TEXT NOT NULL,
    "status" "StatusCampanha" NOT NULL DEFAULT 'RASCUNHO',
    "agendadaPara" TIMESTAMP(3),
    "criadoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "tags" TEXT[],
    "autorId" TEXT,
    "publicadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Depoimento" (
    "id" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "pet" TEXT,
    "texto" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Depoimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambiente" (
    "id" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "largura" INTEGER NOT NULL,
    "altura" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoRecebido" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "mensagem" TEXT NOT NULL,
    "lido" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContatoRecebido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeloDocumento" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoDocumento" NOT NULL,
    "corpo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ModeloDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracao" (
    "chave" TEXT NOT NULL,
    "valor" JSONB NOT NULL,

    CONSTRAINT "Configuracao_pkey" PRIMARY KEY ("chave")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_slug_key" ON "Unidade"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Sala_unidadeId_sigla_key" ON "Sala"("unidadeId", "sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_slug_key" ON "Usuario"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilUsuario_usuarioId_perfil_key" ON "PerfilUsuario"("usuarioId", "perfil");

-- CreateIndex
CREATE UNIQUE INDEX "Sessao_tokenHash_key" ON "Sessao"("tokenHash");

-- CreateIndex
CREATE INDEX "Sessao_expiraEm_idx" ON "Sessao"("expiraEm");

-- CreateIndex
CREATE UNIQUE INDEX "DoisFatores_usuarioId_key" ON "DoisFatores"("usuarioId");

-- CreateIndex
CREATE INDEX "LogAuditoria_entidade_entidadeId_idx" ON "LogAuditoria"("entidade", "entidadeId");

-- CreateIndex
CREATE INDEX "LogAuditoria_criadoEm_idx" ON "LogAuditoria"("criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_cpf_key" ON "Tutor"("cpf");

-- CreateIndex
CREATE INDEX "Tutor_nome_idx" ON "Tutor"("nome");

-- CreateIndex
CREATE INDEX "Tutor_telefone_idx" ON "Tutor"("telefone");

-- CreateIndex
CREATE INDEX "Tutor_email_idx" ON "Tutor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContaPortal_tutorId_key" ON "ContaPortal"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "ContaPortal_email_key" ON "ContaPortal"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Especie_nome_key" ON "Especie"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Raca_especieId_nome_key" ON "Raca"("especieId", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_microchip_key" ON "Pet"("microchip");

-- CreateIndex
CREATE INDEX "Pet_tutorId_idx" ON "Pet"("tutorId");

-- CreateIndex
CREATE INDEX "Pet_nome_idx" ON "Pet"("nome");

-- CreateIndex
CREATE INDEX "PesoRegistro_petId_medidoEm_idx" ON "PesoRegistro"("petId", "medidoEm");

-- CreateIndex
CREATE INDEX "Consentimento_tutorId_tipo_idx" ON "Consentimento"("tutorId", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Servico_slug_key" ON "Servico"("slug");

-- CreateIndex
CREATE INDEX "HorarioTrabalho_usuarioId_diaSemana_idx" ON "HorarioTrabalho"("usuarioId", "diaSemana");

-- CreateIndex
CREATE INDEX "Bloqueio_inicio_fim_idx" ON "Bloqueio"("inicio", "fim");

-- CreateIndex
CREATE INDEX "Agendamento_unidadeId_inicio_idx" ON "Agendamento"("unidadeId", "inicio");

-- CreateIndex
CREATE INDEX "Agendamento_profissionalId_inicio_idx" ON "Agendamento"("profissionalId", "inicio");

-- CreateIndex
CREATE INDEX "Agendamento_petId_idx" ON "Agendamento"("petId");

-- CreateIndex
CREATE INDEX "Agendamento_tutorId_idx" ON "Agendamento"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmacaoPresenca_agendamentoId_key" ON "ConfirmacaoPresenca"("agendamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmacaoPresenca_token_key" ON "ConfirmacaoPresenca"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Atendimento_agendamentoId_key" ON "Atendimento"("agendamentoId");

-- CreateIndex
CREATE INDEX "Atendimento_petId_iniciadoEm_idx" ON "Atendimento"("petId", "iniciadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroProntuario_substituiId_key" ON "RegistroProntuario"("substituiId");

-- CreateIndex
CREATE INDEX "RegistroProntuario_petId_criadoEm_idx" ON "RegistroProntuario"("petId", "criadoEm");

-- CreateIndex
CREATE INDEX "RegistroProntuario_atendimentoId_idx" ON "RegistroProntuario"("atendimentoId");

-- CreateIndex
CREATE INDEX "Anexo_petId_idx" ON "Anexo"("petId");

-- CreateIndex
CREATE INDEX "Assinatura_entidade_entidadeId_idx" ON "Assinatura"("entidade", "entidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "Receita_numero_key" ON "Receita"("numero");

-- CreateIndex
CREATE INDEX "Receita_petId_emitidaEm_idx" ON "Receita"("petId", "emitidaEm");

-- CreateIndex
CREATE UNIQUE INDEX "ProtocoloDose_protocoloId_ordem_key" ON "ProtocoloDose"("protocoloId", "ordem");

-- CreateIndex
CREATE INDEX "Aplicacao_petId_aplicadoEm_idx" ON "Aplicacao"("petId", "aplicadoEm");

-- CreateIndex
CREATE INDEX "Aplicacao_proximaDoseEm_idx" ON "Aplicacao"("proximaDoseEm");

-- CreateIndex
CREATE UNIQUE INDEX "ExameTipo_nome_key" ON "ExameTipo"("nome");

-- CreateIndex
CREATE INDEX "ExamePedido_petId_solicitadoEm_idx" ON "ExamePedido"("petId", "solicitadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "ExameResultado_pedidoId_key" ON "ExameResultado"("pedidoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cirurgia_agendamentoId_key" ON "Cirurgia"("agendamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "FichaAnestesica_cirurgiaId_key" ON "FichaAnestesica"("cirurgiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Baia_unidadeId_codigo_key" ON "Baia"("unidadeId", "codigo");

-- CreateIndex
CREATE INDEX "Internacao_status_idx" ON "Internacao"("status");

-- CreateIndex
CREATE INDEX "Administracao_previstoPara_status_idx" ON "Administracao"("previstoPara", "status");

-- CreateIndex
CREATE UNIQUE INDEX "BoletimDiario_internacaoId_data_key" ON "BoletimDiario"("internacaoId", "data");

-- CreateIndex
CREATE UNIQUE INDEX "PacoteCredito_vendaItemId_key" ON "PacoteCredito"("vendaItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FichaEntradaSaida_agendamentoId_key" ON "FichaEntradaSaida"("agendamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "FichaEntradaSaida_hospedagemId_key" ON "FichaEntradaSaida"("hospedagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_sku_key" ON "Produto"("sku");

-- CreateIndex
CREATE INDEX "Produto_nome_idx" ON "Produto"("nome");

-- CreateIndex
CREATE INDEX "Lote_validade_idx" ON "Lote"("validade");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_produtoId_unidadeId_codigo_key" ON "Lote"("produtoId", "unidadeId", "codigo");

-- CreateIndex
CREATE INDEX "MovimentoEstoque_produtoId_criadoEm_idx" ON "MovimentoEstoque"("produtoId", "criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroControlado_movimentoId_key" ON "RegistroControlado"("movimentoId");

-- CreateIndex
CREATE INDEX "RegistroControlado_produtoId_criadoEm_idx" ON "RegistroControlado"("produtoId", "criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "Orcamento_numero_key" ON "Orcamento"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_numero_key" ON "Venda"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_orcamentoId_key" ON "Venda"("orcamentoId");

-- CreateIndex
CREATE INDEX "Venda_criadoEm_idx" ON "Venda"("criadoEm");

-- CreateIndex
CREATE INDEX "Venda_tutorId_idx" ON "Venda"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "Parcela_lancamentoId_key" ON "Parcela"("lancamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Parcela_pagamentoId_numero_key" ON "Parcela"("pagamentoId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaFinanceira_nome_key" ON "CategoriaFinanceira"("nome");

-- CreateIndex
CREATE INDEX "Lancamento_tipo_status_vencimento_idx" ON "Lancamento"("tipo", "status", "vencimento");

-- CreateIndex
CREATE UNIQUE INDEX "Comissao_vendaItemId_key" ON "Comissao"("vendaItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Cobranca_lancamentoId_key" ON "Cobranca"("lancamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cobranca_contratoId_competencia_key" ON "Cobranca"("contratoId", "competencia");

-- CreateIndex
CREATE UNIQUE INDEX "ModeloMensagem_chave_key" ON "ModeloMensagem"("chave");

-- CreateIndex
CREATE UNIQUE INDEX "Mensagem_chaveUnica_key" ON "Mensagem"("chaveUnica");

-- CreateIndex
CREATE INDEX "Mensagem_status_agendadaPara_idx" ON "Mensagem"("status", "agendadaPara");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_publicadoEm_idx" ON "Post"("publicadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "ModeloDocumento_chave_key" ON "ModeloDocumento"("chave");

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilUsuario" ADD CONSTRAINT "PerfilUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioUnidade" ADD CONSTRAINT "UsuarioUnidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioUnidade" ADD CONSTRAINT "UsuarioUnidade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_contaPortalId_fkey" FOREIGN KEY ("contaPortalId") REFERENCES "ContaPortal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoisFatores" ADD CONSTRAINT "DoisFatores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAuditoria" ADD CONSTRAINT "LogAuditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaPortal" ADD CONSTRAINT "ContaPortal_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raca" ADD CONSTRAINT "Raca_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "Especie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "Especie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_racaId_fkey" FOREIGN KEY ("racaId") REFERENCES "Raca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAlergia" ADD CONSTRAINT "PetAlergia_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesoRegistro" ADD CONSTRAINT "PesoRegistro_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesoRegistro" ADD CONSTRAINT "PesoRegistro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consentimento" ADD CONSTRAINT "Consentimento_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoLgpd" ADD CONSTRAINT "PedidoLgpd_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfissionalServico" ADD CONSTRAINT "ProfissionalServico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfissionalServico" ADD CONSTRAINT "ProfissionalServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioTrabalho" ADD CONSTRAINT "HorarioTrabalho_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioTrabalho" ADD CONSTRAINT "HorarioTrabalho_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueio" ADD CONSTRAINT "Bloqueio_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueio" ADD CONSTRAINT "Bloqueio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueio" ADD CONSTRAINT "Bloqueio_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilaEspera" ADD CONSTRAINT "FilaEspera_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilaEspera" ADD CONSTRAINT "FilaEspera_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilaEspera" ADD CONSTRAINT "FilaEspera_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilaEspera" ADD CONSTRAINT "FilaEspera_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilaEspera" ADD CONSTRAINT "FilaEspera_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmacaoPresenca" ADD CONSTRAINT "ConfirmacaoPresenca_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroProntuario" ADD CONSTRAINT "RegistroProntuario_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroProntuario" ADD CONSTRAINT "RegistroProntuario_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroProntuario" ADD CONSTRAINT "RegistroProntuario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroProntuario" ADD CONSTRAINT "RegistroProntuario_substituiId_fkey" FOREIGN KEY ("substituiId") REFERENCES "RegistroProntuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroProntuario" ADD CONSTRAINT "RegistroProntuario_assinadoPorId_fkey" FOREIGN KEY ("assinadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroProntuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_exameResultadoId_fkey" FOREIGN KEY ("exameResultadoId") REFERENCES "ExameResultado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_enviadoPorId_fkey" FOREIGN KEY ("enviadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceitaItem" ADD CONSTRAINT "ReceitaItem_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceitaItem" ADD CONSTRAINT "ReceitaItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProtocoloVacinal" ADD CONSTRAINT "ProtocoloVacinal_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "Especie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProtocoloDose" ADD CONSTRAINT "ProtocoloDose_protocoloId_fkey" FOREIGN KEY ("protocoloId") REFERENCES "ProtocoloVacinal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_protocoloId_fkey" FOREIGN KEY ("protocoloId") REFERENCES "ProtocoloVacinal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_aplicadoPorId_fkey" FOREIGN KEY ("aplicadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamePedido" ADD CONSTRAINT "ExamePedido_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamePedido" ADD CONSTRAINT "ExamePedido_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamePedido" ADD CONSTRAINT "ExamePedido_exameTipoId_fkey" FOREIGN KEY ("exameTipoId") REFERENCES "ExameTipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamePedido" ADD CONSTRAINT "ExamePedido_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameResultado" ADD CONSTRAINT "ExameResultado_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "ExamePedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameResultado" ADD CONSTRAINT "ExameResultado_liberadoPorId_fkey" FOREIGN KEY ("liberadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_cirurgiaoId_fkey" FOREIGN KEY ("cirurgiaoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_anestesistaId_fkey" FOREIGN KEY ("anestesistaId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cirurgia" ADD CONSTRAINT "Cirurgia_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermoConsentimento" ADD CONSTRAINT "TermoConsentimento_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermoConsentimento" ADD CONSTRAINT "TermoConsentimento_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermoConsentimento" ADD CONSTRAINT "TermoConsentimento_cirurgiaId_fkey" FOREIGN KEY ("cirurgiaId") REFERENCES "Cirurgia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermoConsentimento" ADD CONSTRAINT "TermoConsentimento_internacaoId_fkey" FOREIGN KEY ("internacaoId") REFERENCES "Internacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaAnestesica" ADD CONSTRAINT "FichaAnestesica_cirurgiaId_fkey" FOREIGN KEY ("cirurgiaId") REFERENCES "Cirurgia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroAnestesico" ADD CONSTRAINT "RegistroAnestesico_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "FichaAnestesica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosOperatorio" ADD CONSTRAINT "PosOperatorio_cirurgiaId_fkey" FOREIGN KEY ("cirurgiaId") REFERENCES "Cirurgia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosOperatorio" ADD CONSTRAINT "PosOperatorio_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Baia" ADD CONSTRAINT "Baia_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internacao" ADD CONSTRAINT "Internacao_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internacao" ADD CONSTRAINT "Internacao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internacao" ADD CONSTRAINT "Internacao_baiaId_fkey" FOREIGN KEY ("baiaId") REFERENCES "Baia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internacao" ADD CONSTRAINT "Internacao_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_internacaoId_fkey" FOREIGN KEY ("internacaoId") REFERENCES "Internacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescricaoItem" ADD CONSTRAINT "PrescricaoItem_prescricaoId_fkey" FOREIGN KEY ("prescricaoId") REFERENCES "Prescricao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescricaoItem" ADD CONSTRAINT "PrescricaoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administracao" ADD CONSTRAINT "Administracao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "PrescricaoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administracao" ADD CONSTRAINT "Administracao_realizadoPorId_fkey" FOREIGN KEY ("realizadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoletimDiario" ADD CONSTRAINT "BoletimDiario_internacaoId_fkey" FOREIGN KEY ("internacaoId") REFERENCES "Internacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoletimDiario" ADD CONSTRAINT "BoletimDiario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacote" ADD CONSTRAINT "Pacote_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacoteCredito" ADD CONSTRAINT "PacoteCredito_pacoteId_fkey" FOREIGN KEY ("pacoteId") REFERENCES "Pacote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacoteCredito" ADD CONSTRAINT "PacoteCredito_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacoteCredito" ADD CONSTRAINT "PacoteCredito_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacoteCredito" ADD CONSTRAINT "PacoteCredito_vendaItemId_fkey" FOREIGN KEY ("vendaItemId") REFERENCES "VendaItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedagem" ADD CONSTRAINT "Hospedagem_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedagem" ADD CONSTRAINT "Hospedagem_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedagem" ADD CONSTRAINT "Hospedagem_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedagem" ADD CONSTRAINT "Hospedagem_baiaId_fkey" FOREIGN KEY ("baiaId") REFERENCES "Baia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEntradaSaida" ADD CONSTRAINT "FichaEntradaSaida_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEntradaSaida" ADD CONSTRAINT "FichaEntradaSaida_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEntradaSaida" ADD CONSTRAINT "FichaEntradaSaida_hospedagemId_fkey" FOREIGN KEY ("hospedagemId") REFERENCES "Hospedagem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEntradaSaida" ADD CONSTRAINT "FichaEntradaSaida_responsavelEntradaId_fkey" FOREIGN KEY ("responsavelEntradaId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEntradaSaida" ADD CONSTRAINT "FichaEntradaSaida_responsavelSaidaId_fkey" FOREIGN KEY ("responsavelSaidaId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_vendaItemId_fkey" FOREIGN KEY ("vendaItemId") REFERENCES "VendaItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_compraItemId_fkey" FOREIGN KEY ("compraItemId") REFERENCES "CompraItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoEstoque" ADD CONSTRAINT "MovimentoEstoque_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraItem" ADD CONSTRAINT "CompraItem_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompraItem" ADD CONSTRAINT "CompraItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_movimentoId_fkey" FOREIGN KEY ("movimentoId") REFERENCES "MovimentoEstoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroControlado" ADD CONSTRAINT "RegistroControlado_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrcamentoItem" ADD CONSTRAINT "OrcamentoItem_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrcamentoItem" ADD CONSTRAINT "OrcamentoItem_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrcamentoItem" ADD CONSTRAINT "OrcamentoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_cobrancaId_fkey" FOREIGN KEY ("cobrancaId") REFERENCES "Cobranca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_caixaId_fkey" FOREIGN KEY ("caixaId") REFERENCES "Caixa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "Pagamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_lancamentoId_fkey" FOREIGN KEY ("lancamentoId") REFERENCES "Lancamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caixa" ADD CONSTRAINT "Caixa_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caixa" ADD CONSTRAINT "Caixa_operadorId_fkey" FOREIGN KEY ("operadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoCaixa" ADD CONSTRAINT "MovimentoCaixa_caixaId_fkey" FOREIGN KEY ("caixaId") REFERENCES "Caixa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoCaixa" ADD CONSTRAINT "MovimentoCaixa_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "Pagamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentoCaixa" ADD CONSTRAINT "MovimentoCaixa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaFinanceira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegraComissao" ADD CONSTRAINT "RegraComissao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegraComissao" ADD CONSTRAINT "RegraComissao_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comissao" ADD CONSTRAINT "Comissao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comissao" ADD CONSTRAINT "Comissao_vendaItemId_fkey" FOREIGN KEY ("vendaItemId") REFERENCES "VendaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoCobertura" ADD CONSTRAINT "PlanoCobertura_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoCobertura" ADD CONSTRAINT "PlanoCobertura_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "Cobranca_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "Cobranca_lancamentoId_fkey" FOREIGN KEY ("lancamentoId") REFERENCES "Lancamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegraLembrete" ADD CONSTRAINT "RegraLembrete_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "ModeloMensagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_segmentoId_fkey" FOREIGN KEY ("segmentoId") REFERENCES "Segmento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ambiente" ADD CONSTRAINT "Ambiente_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ───────── Regras que o Prisma não expressa ─────────

-- Agenda sem choque: o banco recusa dois agendamentos ativos no mesmo profissional
-- ou na mesma sala com horários sobrepostos. Encaixe é a exceção.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "Agendamento" ADD CONSTRAINT "agendamento_fim_depois_do_inicio" CHECK ("fim" > "inicio");

ALTER TABLE "Agendamento" ADD CONSTRAINT "agendamento_profissional_sem_choque"
  EXCLUDE USING gist ("profissionalId" WITH =, tsrange("inicio", "fim", '[)') WITH &&)
  WHERE ("profissionalId" IS NOT NULL AND NOT "encaixe" AND "status" NOT IN ('CANCELADO', 'FALTOU'));

ALTER TABLE "Agendamento" ADD CONSTRAINT "agendamento_sala_sem_choque"
  EXCLUDE USING gist ("salaId" WITH =, tsrange("inicio", "fim", '[)') WITH &&)
  WHERE ("salaId" IS NOT NULL AND NOT "encaixe" AND "status" NOT IN ('CANCELADO', 'FALTOU'));

-- Prontuário imutável: registro assinado não é alterado nem apagado.
CREATE FUNCTION prontuario_imutavel() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Registro de prontuário não pode ser apagado';
  END IF;
  IF OLD."assinadoEm" IS NOT NULL THEN
    RAISE EXCEPTION 'Registro de prontuário assinado não pode ser alterado; crie uma retificação';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER registro_prontuario_imutavel
  BEFORE UPDATE OR DELETE ON "RegistroProntuario"
  FOR EACH ROW EXECUTE FUNCTION prontuario_imutavel();

-- Auditoria só aceita inserção.
CREATE FUNCTION somente_insercao() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'Esta tabela só aceita inserção';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_auditoria_somente_insercao
  BEFORE UPDATE OR DELETE ON "LogAuditoria"
  FOR EACH ROW EXECUTE FUNCTION somente_insercao();

-- Saldo de lote nunca fica negativo.
ALTER TABLE "Lote" ADD CONSTRAINT "lote_saldo_nao_negativo" CHECK ("quantidade" >= 0);

-- Busca sem acento para tutores e pets.
CREATE EXTENSION IF NOT EXISTS unaccent;

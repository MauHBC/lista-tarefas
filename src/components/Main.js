import React, { Component } from "react";
import Form from "./Form";
import Tarefas from "./Tarefas";

import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "", // teste3
    tarefas: [],
    index: -1, // teste3
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    // eliminar os espaços no inínio e no fim do imput
    novaTarefa = novaTarefa.trim();

    // leia-se: em "tarefas", busque por "novaTarefa", se não encontrar, retornar -1
    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index == -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1> Lista de Tarefas </h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa} //state, pego da constante acima
        />

        <Tarefas
          tarefas={tarefas} //state, pego da constante acima
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

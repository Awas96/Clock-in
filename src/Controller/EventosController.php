<?php

namespace App\Controller;

use App\Entity\Evento;
use App\Entity\Fichaje;
use App\Entity\Incidencia;
use App\Entity\Turno;
use App\Repository\EventoRepository;
use App\Repository\FichajeRepository;
use App\Repository\IncidenciaRepository;
use App\Repository\TurnoRepository;
use App\Repository\UsuarioRepository;
use Datetime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class EventosController extends AbstractController
{
    /**
     * @Route("/gestion/horarios", name="gestiona_horarios")
     */
    public function indexEventos(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();
        return $this->render('eventos/base.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestion/horario", name="gestiona_horario_personal")
     */
    public function base_usuario(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findByID($this->getUser()->getId());
        dump($usuarios);
        return $this->render('eventos/gestiona_horario.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestion/horarios/leer", name="gestiona_horarios_leer")
     */
    public function recoger(Request $request, EventoRepository $eventoRepository, TurnoRepository $turnoRepository, FichajeRepository $fichajeRepository): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $startDate = Datetime::createFromFormat('d-n-Y', "01-" . ($params["mes"] - 1) . "-" . $params["anno"]);
                $startDate->setTime(0, 0, 0);

                $endDate = Datetime::createFromFormat('d-n-Y', "01-" . ($params["mes"] + 2) . "-" . $params["anno"]);
                $endDate->setTime(0, 0, 0);
                $enEventos = ($eventoRepository->findByUsIdAndDates($params["idusuario"], $startDate->format("Y-m-d"), $endDate->format("Y-m-d")));
                $eventos = array();
                foreach ($enEventos as $ev) {
                    $title = "Evento";
                    $enTurnos = ($turnoRepository->findByEvento($ev->getId()));
                    $fichajes = $fichajeRepository->findByEvento($ev);
                    if (!empty($fichajes)) {
                        if (end($fichajes)->getTipo() == 0) {

                            if ($ev->getFecha() >= new Datetime('today')) {
                                $title = "En progreso";
                            } else {
                                $title = "Sin cerrar";
                            }
                        } else {
                            $title = "Finalizado";
                        }
                    } else {
                        if ($ev->getFecha() >= new Datetime('today')) {
                            $title = "Sin Fichar";
                        } else {
                            $title = "Absentismo";
                        }

                    }
                    dump($ev->getFecha());
                    dump(new Datetime('today'));

                    array_push($eventos, ["id_evento" => $ev->getId(), "fecha" => $ev->getFecha()->format("Y-m-d"), "id_turno" => $enTurnos->getId(), "start" => $enTurnos->getHoraInicio()->format("H:i"), "end" => $enTurnos->getHoraFin()->format("H:i"), "title" => $title]);
                }
            }
            return new JsonResponse($eventos);
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/gestion/incidencias/leer/delimitado", name="gestiona_incidencias_leer")
     */
    public function recogerdelimitado(Request $request, EventoRepository $eventoRepository, IncidenciaRepository $incidenciaRepository, TurnoRepository $turnoRepository, FichajeRepository $fichajeRepository): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            $eventos = array();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $enEventos = ($eventoRepository->findByUsDelim($params["idusuario"], $params["delim"]));

                foreach ($enEventos as $ev) {
                    $enTurnos = ($turnoRepository->findByEvento($ev->getId()));
                    $fichajes = $fichajeRepository->findByEvento($ev);
                    $incidencias = $incidenciaRepository->findByEvento($ev);
                    $tieneIncidencias = false;
                    if (!empty($incidencias)) {
                        $tieneIncidencias = true;
                    }
                    $fichas = array();
                    if (!empty($fichajes)) {
                        foreach ($fichajes as $fichaje) {
                            array_push($fichas, ["id" => $fichaje->getId(), "hora" => $fichaje->getHora(), "tipo" => $fichaje->getTipo()]);

                        }
                        array_push($eventos, ["id_evento" => $ev->getId(), "fecha" => $ev->getFecha()->format("Y-m-d"), "start" => $enTurnos->getHoraInicio()->format("H:i"), "end" => $enTurnos->getHoraFin()->format("H:i"), "tieneIncidencias" => $tieneIncidencias, "fichajes" => $fichas]);
                    } else {
                        array_push($eventos, ["id_evento" => $ev->getId(), "fecha" => $ev->getFecha()->format("Y-m-d"), "start" => $enTurnos->getHoraInicio()->format("H:i"), "end" => $enTurnos->getHoraFin()->format("H:i"), "tieneIncidencias" => $tieneIncidencias, "fichajes" => null]);
                    }

                }
                return new JsonResponse($eventos);
            }
            return new Response('Error!', 400);
        }
    }


    /**
     * @Route("/gestion/horarios/agregar", name="gestiona_horarios_agregar")
     */
    public function agregar(Request $request, UsuarioRepository $usuarioRepository, TurnoRepository $turnoRepository, EventoRepository $eventoRepository, Evento $evento = null, Turno $turno = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);

                foreach ($datos as $params) {
                    dump($params["tipo"]);
                    dump($params["tipo"] == "Finalizado");
                    if ($params["tipo"] != "Finalizado") {
                        if ($params["tipo"] != "En Proceso") {

                            $id = $params["id"];
                            $fecha = new Datetime(date('Y-m-d', strtotime($params["fecha"])));
                            $inicio = new Datetime(date('Y-m-d H:i', strtotime($params['inicio'])));
                            $fin = new Datetime(date('Y-m-d  H:i', strtotime($params['fin'])));
                            $guardar = $params["accion"];
                            $em = $this->getDoctrine()->getManager();
                            if ($guardar == "true") {
                                $evento = new Evento();
                                $evento->setFecha($fecha);
                                $evento->setUsuario($usuarioRepository->findByID($id));
                                $turno = new Turno();
                                $turno->setHoraInicio($inicio);
                                $turno->setHoraFin($fin);
                                $turno->setEvento($evento);
                                $evento->setTurno($turno);
                                $em->persist($turno);
                                $em->persist($evento);
                                $em->flush();
                            } elseif ($guardar == "edit") {
                                $idEvento = $params["id_evento"];
                                $idTurno = $params["id_turno"];
                                $turno = $turnoRepository->findById($idTurno);
                                $turno->setHoraInicio($inicio);
                                $turno->setHoraFin($fin);
                                $em->persist($turno);
                                $em->flush();
                            } elseif ($guardar == "delete") {
                                $idEvento = $params["id_evento"];
                                $idTurno = $params["id_turno"];
                                $evento = $eventoRepository->findById($idEvento);
                                $turno = $turnoRepository->findById($idTurno);
                                $em->remove($turno);
                                $em->remove($evento);
                                $em->flush();

                            }

                        }
                    }
                }

            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/fichaje", name="fichar")
     */
    public function fichaje(UsuarioRepository $usuarioRepository, EventoRepository $eventoRepository, TurnoRepository $turnoRepository, FichajeRepository $fichajeRepository): Response
    {
        $usuario = $usuarioRepository->findByID($this->getUser()->getId());
        $fecha = date("Y-m-d");
        $fecha = $eventoRepository->findByUsIdAndDate($usuario, $fecha);
        $turnos = array();
        $estado = 0;
        foreach ($fecha as $ev) {

            $turno = $turnoRepository->findByEvento($ev->getId());
            $fichajes = $fichajeRepository->findByEvento($ev);

            if ($fichajes != null) {
                if (end($fichajes)->getTipo() == 0) {
                    $estado = 1;
                    array_push($turnos, $turno);
                }
            } else {
                array_push($turnos, $turno);
            }
        }

        usort(
            $turnos,
            function (Turno $a, Turno $b) {
                if ($a->getHoraInicio() == $b->getHoraInicio()) {
                    return 0;
                }
                return ($a->getHoraInicio() < $b->getHoraInicio()) ? -1 : 1;
            }
        );
        dump($turnos);


        return $this->render('eventos/fichar.html.twig', [
            'estado' => $estado,
            'evento' => $fecha,
            'turnos' => $turnos,
            'usuario' => $usuario,
        ]);
    }

    /**
     * @Route("/fichaje/nuevo", name="fichar_nuevo")
     */
    public function fichar(Request $request, EventoRepository $eventoRepository, $fichaje = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);
                $evento = $eventoRepository->findById($datos["id_evento"]);
                dump($evento);
                $fichaje = new Fichaje();
                $fichaje->setHora(new Datetime(date('Y-m-d H:i:s', strtotime($datos["hora_fichaje"]))));
                $fichaje->setEvento($evento);
                $fichaje->setTipo($datos["estado"]);
                $em = $this->getDoctrine()->getManager();
                $em->persist($fichaje);
                $em->flush();
                dump($fichaje);
            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/incidencias/todos", name="incidencias_mod")
     */
    public function incidencias(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();

        return $this->render('eventos/fichajesMod.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/incidencias/usuario", name="incidencias_usuario")
     */
    public function incidenciasUsuario(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();

        return $this->render('eventos/fichajes.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }


    /**
     * @Route("/incidencias/ev/{id_evento}", name="incidencias_evento")
     */
    public function incidenciasDeEvento(EventoRepository $eventoRepository, IncidenciaRepository $incidenciaRepository, UsuarioRepository $usuarioRepository, TurnoRepository $turnoRepository, $id_evento): Response
    {
        $evento = $eventoRepository->findById($id_evento);
        $usuario = $usuarioRepository->findByID($evento->getUsuario());
        $turno = $turnoRepository->findByEvento($evento);
        $incidencias = $incidenciaRepository->findByEvento($evento->getId());

        return $this->render('eventos/incidenciasPorEvento.html.twig', [
            'usuario' => $usuario,
            'turno' => $turno,
            'evento' => $evento,
            'incidencias' => $incidencias,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/incidencia/nueva", name="incidencia_nueva")
     */
    public function incidenciaNueva(Request $request, EventoRepository $eventoRepository): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);
                $evento = $eventoRepository->findById($datos["id_evento"]);
                dump($datos);
                $incidencia = new Incidencia();
                $incidencia->setEvento($evento);
                $incidencia->setEstado($datos["estado"]);
                $incidencia->setHora(new Datetime(date('Y-m-d H:i:s', strtotime($datos["hora"]))));
                $incidencia->setMotivo($datos["motivo"]);
                $incidencia->setJustificacion("");
                $em = $this->getDoctrine()->getManager();
                $em->persist($incidencia);
                $em->flush();
            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/incidencia/justificar", name="incidencia_justificar")
     */
    public function incidenciaJustificar(Request $request, IncidenciaRepository $incidenciaRepository): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);

                dump($datos);
                $incidencia = $incidenciaRepository->findById($datos["id_incidencia"]);
                $incidencia->setEstado($datos["estado"]);
                if ($datos["estado"] == 2) {
                    $incidencia->setJustificacion($datos["justificacion"]);
                }
                $em = $this->getDoctrine()->getManager();
                $em->persist($incidencia);
                $em->flush();
            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/incidencias/justificar/usuario", name="incidencias_usuario_activas")
     */
    public function incidenciaUsuarioAceotptadas(IncidenciaRepository $incidenciaRepository): Response
    {
        $incidencias = $incidenciaRepository->findByEstadoAndUsuario(1, $this->getUser()->getId());
        dump($incidencias);
        return $this->render('incidencias/justificar.html.twig', [
            'incidencias' => $incidencias,
        ]);
    }

    /**
     * @Route("/incidencias/historico", name="incidencias_usuario_finalizadas_MOD")
     */
    public function incidenciaUsuarioFinalizadasMod(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();

        return $this->render('incidencias/historico_mod.html.twig', [
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * @Route("/incidencias/historico/usuario", name="incidencias_usuario_finalizadas")
     */
    public function incidenciaUsuarioFinalizadas(IncidenciaRepository $incidenciaRepository): Response
    {
        $incidencias = $incidenciaRepository->findByEstadoAndUsuario(3, $this->getUser()->getId());

        return $this->render('incidencias/historico.html.twig', [
            'incidencias' => $incidencias,
        ]);
    }

    /**
     * @Route("/incidencias/resoluciones", name="incidencias_resoluciones")
     */
    public function incidenciaResolucion(Request $request, IncidenciaRepository $incidenciaRepository, UsuarioRepository $usuarioRepository): Response
    {
        $incidencias = $incidenciaRepository->findByEstado(2);

        $datos = array();
        foreach ($incidencias as $in) {
            $usuario = $in->getEvento()->getUsuario()->getUsername();
            array_push($datos, ['id_incidencia' => $in->getId(), 'motivo' => $in->getMotivo(), 'justificacion' => $in->getJustificacion(), 'hora' => $in->getHora(), 'evento' => $in->getEvento(), 'nombreUsuario' => $usuario]);
        }
        dump($datos);
        return $this->render('incidencias/resolver.html.twig', [
            'incidencias' => $datos,
        ]);
    }

    /**
     * @Route("/historico/incidencias/leer/delimitado", name="historico_incidencias_leer")
     */
    public function historicoDelimitado(Request $request, UsuarioRepository $usuarioRepository, IncidenciaRepository $incidenciaRepository, TurnoRepository $turnoRepository, FichajeRepository $fichajeRepository): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            $arrIncidencias = array();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $usuario = $usuarioRepository->findByID($params["idusuario"]);
                $incidencias = $incidenciaRepository->findByEstadoAndUsuarioDelim(3, $usuario, $params["delim"]);
                dump($incidencias);
                foreach ($incidencias as $in) {

                    array_push($arrIncidencias, ["hora" => $in->getHora()->format("Y-m-d"), "motivo" => $in->getMotivo(), "justificacion" => $in->getJustificacion()]);
                }

            }
            return new JsonResponse($arrIncidencias);
        }
        return new Response('Error!', 400);
    }


}
